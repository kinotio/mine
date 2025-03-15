'use server'

import { eq } from 'drizzle-orm'

import database from '@/server/services/drizzle'
import { users } from '@/server/databases/tables'
import { User } from '@/server/databases/types'
import { ActionResponse } from '@/server/utils/types'
import { updateProfile } from '@/server/actions/profile/update'
import { generateProfileUrl } from '@/lib/utils'
import { UserValidation } from '@/server/services/validation/user'

export const updateUser = async (id: string, user: User): Promise<ActionResponse<User>> => {
  try {
    const validation = UserValidation.safeParse(user)

    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues[0].message
      }
    }

    // Verify user exists
    const existingUser = await database.query.users.findFirst({
      where: eq(users.id, id)
    })

    if (!existingUser) {
      return {
        success: false,
        error: 'An account with this ID does not exist.'
      }
    }

    // Check if new username is available if changing
    if (user.username) {
      const usernameExists = await database.query.users.findFirst({
        where: (users, { and, eq, not }) =>
          and(eq(users.username, user.username!), not(eq(users.id, id)))
      })

      if (usernameExists) {
        return {
          success: false,
          error: 'An account with this username already exists.'
        }
      }
    }

    // Check if email is available if changing
    if (user.email) {
      const emailExists = await database.query.users.findFirst({
        where: (users, { and, eq, not }) =>
          and(eq(users.email, user.email!.toLowerCase()), not(eq(users.id, id)))
      })

      if (emailExists) {
        return {
          success: false,
          error: 'An account with this email already exists.'
        }
      }
    }

    const updated = await database.update(users).set(user).where(eq(users.id, id)).returning()

    // Update associated profile if necessary fields changed
    if (user.first_name || user.last_name || user.username || user.email) {
      await updateProfile(id, {
        ...(user.first_name || user.last_name
          ? {
              name: `${updated[0].first_name} ${updated[0].last_name}`
            }
          : {}),
        ...(user.email ? { email: user.email.toLowerCase() } : {}),
        ...(user.username
          ? {
              profile_url: generateProfileUrl(user.username)
            }
          : {})
      })
    }

    return {
      success: true,
      data: updated[0] as User
    }
  } catch (error) {
    console.error('Update user error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while updating the user.'
    }
  }
}
