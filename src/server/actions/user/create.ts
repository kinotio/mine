'use server'

import { eq } from 'drizzle-orm'

import { users } from '@/server/databases/tables'
import { User } from '@/server/databases/types'

import { ActionResponse } from '@/server/utils/types'
import { createProfile } from '@/server/actions/profile/create'
import { sendJoined } from '@/server/actions/email/joined'

import { UserValidation } from '@/server/validations/user'
import database from '@/server/services/drizzle'
import clerk from '@/server/services/clerk'

import { generateProfileUrl } from '@/lib/utils'

export const createUser = async (payload: User): Promise<ActionResponse<User>> => {
  try {
    // Clean and validate input
    const validation = UserValidation.safeParse(payload)

    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues[0].message
      }
    }

    // Check if username or email already exists
    const existingUser = await database.query.users.findFirst({
      where: (users, { or, eq }) =>
        or(eq(users.username, payload.username), eq(users.email, payload.email.toLowerCase()))
    })

    if (existingUser) {
      return {
        success: false,
        error:
          existingUser.username === payload.username
            ? 'An account with this username already exists.'
            : 'An account with this email already exists.'
      }
    }

    // Create user
    const data: Omit<User, 'created_at' | 'updated_at'> = {
      id: payload.id,
      username: payload.username,
      email: payload.email.toLowerCase(),
      first_name: payload.first_name,
      last_name: payload.last_name
    }

    const created = await database.insert(users).values(data).returning()

    // Create associated profile
    const profile = await createProfile({
      user_id: created[0].id,
      name: `${payload.first_name} ${payload.last_name}`,
      email: payload.email,
      profile_url: generateProfileUrl(created[0].username)
    })

    if (!profile.success) {
      // You might want to delete the user if profile creation fails
      await database.delete(users).where(eq(users.id, created[0].id))
      await clerk.users.deleteUser(created[0].id)

      return {
        success: false,
        error: 'An error occurred while creating the user profile.'
      }
    }

    await sendJoined({
      to: 'contact@kinotio.io',
      subject: 'Joined Profile',
      data: {
        username: created[0].username,
        email: created[0].email,
        joinDate: created[0].created.toString(),
        profileUrl: profile.data?.profile_url
      }
    })

    return {
      success: true,
      data: created[0] as User
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while creating the user.'
    }
  }
}
