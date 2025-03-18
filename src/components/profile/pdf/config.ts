import { StyleSheet } from '@react-pdf/renderer'

// Colors
const colors = {
  primary: '#000000',
  secondary: '#444444',
  background: '#FFFFFF',
  lightGray: '#F2F2F2',
  accent: '#000000'
}

// Fonts
const fonts = {
  header: 'Helvetica-Bold',
  subheader: 'Helvetica-Bold',
  body: 'Helvetica',
  bodyBold: 'Helvetica-Bold'
}

export const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: colors.background,
    padding: 40,
    fontFamily: fonts.body
  },

  // Page header (for subsequent pages)
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingBottom: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.secondary
  },
  headerName: {
    fontSize: 10,
    fontFamily: fonts.header
  },
  headerTitle: {
    fontSize: 8,
    color: colors.secondary
  },

  // Main header section (first page)
  header: {
    flexDirection: 'column',
    marginBottom: 20,
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.accent
  },
  name: {
    fontSize: 24,
    fontFamily: fonts.header,
    marginBottom: 4,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  title: {
    fontSize: 12,
    color: colors.secondary,
    marginBottom: 8,
    textAlign: 'center'
  },
  contact: {
    fontSize: 10,
    marginBottom: 6,
    textAlign: 'center'
  },
  socialLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10
  },
  socialLink: {
    fontSize: 8,
    color: colors.secondary
  },

  // Section styles
  section: {
    marginBottom: 20,
    width: '100%'
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: fonts.subheader,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.accent,
    paddingBottom: 3
  },
  content: {
    fontSize: 10,
    lineHeight: 1.5,
    textAlign: 'justify'
  },

  // Skills
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4
  },
  skill: {
    fontSize: 9,
    padding: 3,
    marginRight: 8,
    marginBottom: 5
  },

  // Experience section
  experience: {
    marginBottom: 12
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2
  },
  companyName: {
    fontSize: 10,
    fontFamily: fonts.body,
    marginBottom: 2
  },
  jobTitle: {
    fontSize: 10,
    fontFamily: fonts.bodyBold
  },
  dates: {
    fontSize: 9,
    color: colors.secondary
  },
  description: {
    fontSize: 9,
    lineHeight: 1.5,
    textAlign: 'justify'
  },
  achievements: {
    marginTop: 4
  },
  achievement: {
    fontSize: 9,
    lineHeight: 1.5
  },

  // Projects section
  project: {
    marginBottom: 10
  },
  projectTitle: {
    fontSize: 10,
    fontFamily: fonts.bodyBold,
    marginBottom: 2
  },
  technologies: {
    fontSize: 9,
    marginTop: 2,
    fontStyle: 'italic'
  },
  projectLinks: {
    marginTop: 3
  },
  projectLink: {
    fontSize: 8,
    color: colors.secondary,
    textDecoration: 'none'
  },

  // Education section
  educationItem: {
    marginBottom: 8
  },
  educationTitle: {
    fontSize: 10,
    fontFamily: fonts.bodyBold,
    marginBottom: 1
  },
  educationSubtitle: {
    fontSize: 9,
    marginBottom: 1
  },

  // Custom sections
  customItem: {
    marginBottom: 8
  },
  customItemTitle: {
    fontSize: 10,
    fontFamily: fonts.bodyBold,
    marginBottom: 1
  },
  customItemSubtitle: {
    fontSize: 9,
    marginBottom: 1
  },

  // Links
  link: {
    color: colors.primary,
    textDecoration: 'none'
  },

  // Horizontal line
  divider: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.lightGray,
    marginVertical: 8
  },

  // List items
  listItem: {
    flexDirection: 'row',
    marginBottom: 2
  },
  listItemBullet: {
    width: 10,
    fontSize: 9
  },
  listItemContent: {
    flex: 1,
    fontSize: 9
  },

  // Columns for skills or other horizontal layouts
  columns: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10
  },
  column: {
    width: '50%',
    paddingRight: 5
  },

  // Table styles for structured data
  table: {
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.lightGray,
    marginBottom: 10
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray
  },
  tableHeaderCell: {
    fontSize: 9,
    fontFamily: fonts.bodyBold,
    padding: 5,
    backgroundColor: colors.lightGray
  },
  tableCell: {
    fontSize: 9,
    padding: 5
  },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    fontSize: 8,
    textAlign: 'center',
    color: colors.secondary
  },

  // Page numbers
  pageNumber: {
    position: 'absolute',
    bottom: 20,
    right: 40,
    fontSize: 8,
    color: colors.secondary
  },

  // Image styles
  image: {
    marginBottom: 10
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10
  },

  // Quote or highlighted text
  quote: {
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: colors.accent,
    fontStyle: 'italic',
    marginVertical: 8
  },

  // Badges or tags
  badge: {
    fontSize: 8,
    backgroundColor: colors.lightGray,
    padding: 3,
    borderRadius: 2,
    marginRight: 5,
    marginBottom: 5
  },

  // Progress bar for skills
  progressBarContainer: {
    height: 4,
    flexDirection: 'row',
    backgroundColor: colors.lightGray,
    marginTop: 2,
    marginBottom: 5,
    width: '100%'
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.accent
  },

  // Responsive container
  container: {
    width: '100%',
    marginBottom: 10
  },

  // Centered text
  centered: {
    textAlign: 'center'
  },

  // Right-aligned text
  rightAligned: {
    textAlign: 'right'
  },

  // Small text
  small: {
    fontSize: 8
  },

  // Highlight
  highlight: {
    backgroundColor: colors.lightGray,
    padding: 5,
    marginBottom: 8
  },

  languagesContainer: {
    marginTop: 5
  },

  languageItem: {
    fontSize: 10,
    marginBottom: 4,
    display: 'flex',
    flexDirection: 'row'
  },

  languageName: {
    fontWeight: 'bold'
  },

  languageLevel: {
    fontWeight: 'normal'
  }
})
