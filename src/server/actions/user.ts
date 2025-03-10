'use server'

import { drizzle, eq } from '@/server/drizzle'
import { users, type User } from '@/server/db/schemas/user'

export const getUserById = async (id: string) => {
  return await drizzle.query.users.findFirst({
    where: eq(users.id, id)
  })
}

export const saveUser = async (user: User) => {
  return await drizzle.insert(users).values(user).returning()
}

export const updateUser = async (id: string, user: Partial<User>) => {
  return await drizzle.update(users).set(user).where(eq(users.id, id)).returning()
}

export const deleteUser = async (id: string) => {
  return await drizzle.delete(users).where(eq(users.id, id)).returning()
}
