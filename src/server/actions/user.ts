'use server'

import database, { eq } from '@/server/services/drizzle'
import { users, type User } from '@/server/databases'
import { saveProfile, updateProfile } from '@/server/actions/profile'

import { cleanParamsUsername, generateProfileUrl } from '@/lib/utils'

export const getUserById = async (id: string) => {
  return await database.drizzle.query.users.findFirst({
    where: eq(users.id, id)
  })
}

export const getUserByUsername = async (username: string) => {
  return await database.drizzle.query.users.findFirst({
    where: eq(users.username, cleanParamsUsername(username)),
    with: { profile: true }
  })
}

export const saveUser = async (user: User) => {
  const savedUser = await database.drizzle.insert(users).values(user).returning()

  await saveProfile({
    user_id: savedUser[0].id,
    name: user.first_name + ' ' + user.last_name,
    email: savedUser[0].email,
    bio: 'Welcome, this is my Mine bio 👋',
    profile_url: generateProfileUrl(user.username)
  })
}

export const updateUser = async (id: string, user: Partial<User>) => {
  const updatedUser = await database.drizzle
    .update(users)
    .set(user)
    .where(eq(users.id, id))
    .returning()

  await updateProfile(updatedUser[0].id, {
    name: updatedUser[0].first_name + ' ' + updatedUser[0].last_name,
    email: updatedUser[0].email,
    profile_url: generateProfileUrl(updatedUser[0].username)
  })
}

export const deleteUser = async (id: string) => {
  return await database.drizzle.delete(users).where(eq(users.id, id)).returning()
}
