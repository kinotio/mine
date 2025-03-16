const seed = async () => {
  await import('@/server/databases/seeds/profile-section-templates')
}

seed()
  .then(() => console.log('[✓] seeds applied successfully!'))
  .catch((error) => console.error('[✗] seeds failed to apply:', error))
