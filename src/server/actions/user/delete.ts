'use server'

import { eq } from 'drizzle-orm'

import { users, userProfiles, userProfileFiles } from '@/server/databases/tables'
import { User, UserProfile, UserProfileFile } from '@/server/databases/types'
import { ActionResponse } from '@/server/utils/types'

import database from '@/server/services/drizzle'
import cache from '@/server/services/redis'
import { minioClient } from '@/server/services/minio'

type DeleteUserResponse = {
  user: User
  profile?: UserProfile
  deletedFiles: number
}

export const deleteUser = async (id: string): Promise<ActionResponse<DeleteUserResponse>> => {
  try {
    // Get user with profile and related files
    const user = await database.query.users.findFirst({
      where: eq(users.id, id),
      with: {
        user_profile: {
          with: {
            user_profile_files: true
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
      if (
        Array.isArray(user.user_profile?.user_profile_files) &&
        user.user_profile?.user_profile_files?.length > 0
      ) {
        // Delete files from Minio
        const deletePromises = user.user_profile.user_profile_files.map(
          async (file: UserProfileFile) => {
            try {
              const [bucket, objectName] = file.file_url.split('/').slice(-2)
              await minioClient.removeObject(bucket, objectName)
            } catch (error) {
              console.error(`Failed to delete file from storage: ${file.file_url}`, error)
              // Continue with other deletions even if one fails
            }
          }
        )

        // Wait for all file deletions to complete
        await Promise.allSettled(deletePromises)

        // Delete file records from database
        await tx
          .delete(userProfileFiles)
          .where(eq(userProfileFiles.user_profile_id, user.user_profile.id))
      }

      // Delete profile
      if (user.user_profile) {
        await tx.delete(userProfiles).where(eq(userProfiles.user_id, id))
      }

      // Finally delete the user
      const deleted = await tx.delete(users).where(eq(users.id, id)).returning()

      return {
        user: deleted[0],
        profile: user.user_profile,
        deletedFiles: user.user_profile?.user_profile_files?.length || 0
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
