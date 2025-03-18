'use server'

import { eq, and } from 'drizzle-orm'

import { userProfileSections, userProfileSectionItems, users } from '@/server/databases/tables'
import { UserProfileSectionItem } from '@/server/databases/types'
import { ActionResponse } from '@/server/utils/types'

import database from '@/server/services/drizzle'
import cache from '@/server/services/redis'

export const deleteProfileSectionItem = async (
  userId: string,
  sectionId: string,
  itemId: string
): Promise<ActionResponse<UserProfileSectionItem>> => {
  try {
    const section = await database.query.userProfileSections.findFirst({
      where: eq(userProfileSections.id, sectionId)
    })

    if (!section) {
      return {
        success: false,
        error: 'An error occurred while finding section'
      }
    }

    // Get the item with its related section and profile info to verify ownership
    const item = await database.query.userProfileSectionItems.findFirst({
      where: and(
        eq(userProfileSectionItems.id, itemId),
        eq(userProfileSectionItems.user_profile_section_id, section.id)
      )
    })

    if (!item) {
      return {
        success: false,
        error: 'An error occurred while finding item'
      }
    }

    const user = await database.query.users.findFirst({
      where: eq(users.id, userId)
    })

    if (user?.username) await cache.invalidate(`user:${user.username}`)

    // Delete the item
    const result = await database.transaction(async (tx) => {
      const deleted = await tx
        .delete(userProfileSectionItems)
        .where(eq(userProfileSectionItems.id, itemId))
        .returning()

      return deleted[0]
    })

    return {
      success: true,
      data: result as UserProfileSectionItem
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while deleting the item'
    }
  }
}
