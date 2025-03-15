'use server'

import { eq } from 'drizzle-orm'

import { users, profiles, files } from '@/server/databases/tables'
import { User, Profile } from '@/server/databases/types'
import { ActionResponse } from '@/server/utils/types'

import { minioClient } from '@/server/services/minio'
import database from '@/server/services/drizzle'
import cache from '@/server/services/redis'

type DeleteUserResponse = {
  user: User
  profile?: Profile
  deletedFiles: number
}

export const deleteUser = async (id: string): Promise<ActionResponse<DeleteUserResponse>> => {
  try {
    // Get user with profile and related files
    const user = await database.query.users.findFirst({
      where: eq(users.id, id),
      with: {
        profile: {
          with: {
            files: true
          }
        }
      }
    })

    if (!user) {
      return {
        success: false,
        error: 'An account with that ID does not exist'
      }
    }

    await cache.invalidate(`user:${user.username}`)

    // Start a transaction to ensure all deletes succeed or none do
    const result = await database.transaction(async (tx) => {
      // Delete profile's files from storage
      if (Array.isArray(user.profile?.files) && user.profile?.files?.length > 0) {
        // Delete files from Minio
        const deletePromises = user.profile.files.map(async (file) => {
          try {
            const [bucket, objectName] = file.file_url.split('/').slice(-2)
            await minioClient.removeObject(bucket, objectName)
          } catch (error) {
            console.error(`Failed to delete file from storage: ${file.file_url}`, error)
            // Continue with other deletions even if one fails
          }
        })

        // Wait for all file deletions to complete
        await Promise.allSettled(deletePromises)

        // Delete file records from database
        await tx.delete(files).where(eq(files.profile_id, user.profile.id))
      }

      // Delete profile
      if (user.profile) {
        await tx.delete(profiles).where(eq(profiles.user_id, id))
      }

      // Finally delete the user
      const deleted = await tx.delete(users).where(eq(users.id, id)).returning()

      return {
        user: deleted[0],
        profile: user.profile,
        deletedFiles: user.profile?.files?.length || 0
      }
    })

    return {
      success: true,
      data: result as DeleteUserResponse
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while deleting user.'
    }
  }
}
