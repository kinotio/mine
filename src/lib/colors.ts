// Function to generate a random color from a predefined neobrutalist palette
export function getRandomNeobrutalistColor(): string {
  const neobrutalistColors = [
    '#ffde59', // yellow
    '#4cc9f0', // blue
    '#8ac926', // green
    '#f72585', // pink
    '#7209b7', // purple
    '#ff6b6b', // red
    '#3a86ff', // bright blue
    '#fb5607' // orange
  ]

  return neobrutalistColors[Math.floor(Math.random() * neobrutalistColors.length)]
}

// Function to generate a consistent color based on a string (like a name)
export function getColorFromString(str: string): string {
  const neobrutalistColors = [
    '#ffde59', // yellow
    '#4cc9f0', // blue
    '#8ac926', // green
    '#f72585', // pink
    '#7209b7', // purple
    '#ff6b6b', // red
    '#3a86ff', // bright blue
    '#fb5607' // orange
  ]

  // Simple hash function to get a consistent index based on the string
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  // Convert to positive number and get index
  const index = Math.abs(hash) % neobrutalistColors.length
  return neobrutalistColors[index]
}

// Function to get a lighter version of a color for backgrounds
export function getLighterColor(hexColor: string): string {
  // Convert hex to RGB
  const r = Number.parseInt(hexColor.slice(1, 3), 16)
  const g = Number.parseInt(hexColor.slice(3, 5), 16)
  const b = Number.parseInt(hexColor.slice(5, 7), 16)

  // Mix with white to create a lighter version (70% original, 30% white)
  const lighterR = Math.round(r * 0.7 + 255 * 0.3)
  const lighterG = Math.round(g * 0.7 + 255 * 0.3)
  const lighterB = Math.round(b * 0.7 + 255 * 0.3)

  // Convert back to hex
  return `#${lighterR.toString(16).padStart(2, '0')}${lighterG.toString(16).padStart(2, '0')}${lighterB.toString(16).padStart(2, '0')}`
}

// Function to get a darker version of a color for text or borders
export function getDarkerColor(hexColor: string): string {
  // Convert hex to RGB
  const r = Number.parseInt(hexColor.slice(1, 3), 16)
  const g = Number.parseInt(hexColor.slice(3, 5), 16)
  const b = Number.parseInt(hexColor.slice(5, 7), 16)

  // Mix with black to create a darker version (80% original, 20% black)
  const darkerR = Math.round(r * 0.8)
  const darkerG = Math.round(g * 0.8)
  const darkerB = Math.round(b * 0.8)

  // Convert back to hex
  return `#${darkerR.toString(16).padStart(2, '0')}${darkerG.toString(16).padStart(2, '0')}${darkerB.toString(16).padStart(2, '0')}`
}

// Function to create a gradient from a base color
export function getGradientFromColor(hexColor: string): string {
  const lighterColor = getLighterColor(hexColor)
  return `linear-gradient(135deg, ${hexColor} 0%, ${lighterColor} 100%)`
}

// Function to determine if text should be white or black based on background color
export function getTextColorForBackground(hexColor: string): string {
  // Convert hex to RGB
  const r = Number.parseInt(hexColor.slice(1, 3), 16)
  const g = Number.parseInt(hexColor.slice(3, 5), 16)
  const b = Number.parseInt(hexColor.slice(5, 7), 16)

  // Calculate luminance - standard formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  // Return white for dark backgrounds, black for light backgrounds
  return luminance > 0.5 ? '#000000' : '#ffffff'
}
