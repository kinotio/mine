export const removeEmojis = (text?: string): string => {
  if (!text) return ''

  try {
    // A more targeted approach to remove only emoji characters
    // while preserving regular text
    return (
      text
        // Remove surrogate pairs (most emoji)
        .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '')
        // Remove specific emoji ranges
        .replace(/[\u2600-\u26FF]/g, '') // Miscellaneous symbols
        .replace(/[\u2700-\u27BF]/g, '') // Dingbats
        .replace(/[\uFE00-\uFE0F]/g, '') // Variation selectors
        // Clean up and return
        .trim()
    )
  } catch (error) {
    console.error('An error occurred while removing emojis:', error)
    // If something goes wrong, return the original text
    return text
  }
}

export const formatDate = (dateString: string, current?: boolean): string => {
  if (current) return 'Present'

  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  } catch (error) {
    console.error('An error occurred while formatting date:', error)
    return dateString
  }
}
