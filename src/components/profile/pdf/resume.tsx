import { Document, Page, Text, View, Link } from '@react-pdf/renderer'

import { styles } from '@/components/profile/pdf/config'
import { formatDate, removeEmojis } from '@/components/profile/pdf/helpers'
import { UserProfile } from '@/lib/types/profile'

interface ResumeTemplateProps {
  profile: UserProfile
}

const MainHeader = ({ profile }: { profile: UserProfile }) => (
  <View style={styles.header} fixed>
    <Text style={styles.name}>
      {profile.name
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')}
    </Text>
    {profile.title && <Text style={styles.title}>{profile.title}</Text>}
    <Text style={styles.contact}>
      {profile.location && `${profile.location} | `}
      {profile.email}
      {profile.website && ` | ${profile.website}`}
    </Text>
    <View style={styles.socialLinks}>
      {profile.github && <Text style={styles.socialLink}>GitHub: @{profile.github}</Text>}
      {profile.linkedin && <Text style={styles.socialLink}>LinkedIn: @{profile.linkedin}</Text>}
      {profile.x && <Text style={styles.socialLink}>X: @{profile.x}</Text>}
      {profile.bluesky && <Text style={styles.socialLink}>Bluesky: @{profile.bluesky}</Text>}
    </View>
  </View>
)

// Compact header for continuation pages
const ContinuationHeader = ({ profile }: { profile: UserProfile }) => (
  <View style={styles.pageHeader} fixed render={({ pageNumber }) => pageNumber > 1}>
    <Text style={styles.headerName}>{profile.name}</Text>
    <Text style={styles.headerTitle}>{profile.title || ''}</Text>
  </View>
)

const ProfessionalSummary = ({ bio }: { bio: string }) => {
  const cleanBio = removeEmojis(bio)

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Professional Summary</Text>
      <Text style={styles.content}>{cleanBio}</Text>
    </View>
  )
}

// Helper function to extract skills from profile sections
const extractSkills = (profile: UserProfile) => {
  const skillsSection = profile.user_profile_sections.find(
    (section) => section.slug === 'skills' || section.name.toLowerCase().includes('skill')
  )

  if (!skillsSection) return []

  return skillsSection.user_profile_section_items.map((item) => ({
    name: item.metadata.name || item.metadata.skill || Object.values(item.metadata)[0] || '',
    level: parseInt(item.metadata.level) || null
  }))
}

const SkillsSection = ({ skills }: { skills: { name: string; level: number | null }[] }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Key Competencies</Text>
    <View style={styles.skillsContainer}>
      {skills.map((skill, index) => (
        <Text key={index} style={styles.skill}>
          {skill.name}
          {/* {skill.level ? ` (${skill.level}%)` : ''} */}
        </Text>
      ))}
    </View>
  </View>
)

const ProfileSectionItem = ({
  item,
  sectionName
}: {
  item: {
    id: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    metadata: { [key: string]: any }
  }
  sectionName: string
}) => {
  // Extract fields based on section type
  let title = ''
  let subtitle = ''
  let description = ''
  let dateDisplay = ''

  // Work Experience
  if (sectionName.toLowerCase().includes('experience')) {
    title = item.metadata.position || item.metadata.title || item.metadata.role || ''
    subtitle = item.metadata.company || item.metadata.organization || ''
    description = item.metadata.description || ''

    // Handle period/date display
    if (item.metadata.period) {
      dateDisplay = item.metadata.period
    } else {
      const startDate = item.metadata.startDate || item.metadata.start_date || ''
      const endDate = item.metadata.endDate || item.metadata.end_date || ''
      const current = item.metadata.current === 'true' || item.metadata.current === true
      dateDisplay = startDate
        ? `${formatDate(startDate)} - ${current ? 'Present' : endDate ? formatDate(endDate) : ''}`
        : ''
    }
  }
  // Projects or Portfolio
  else if (
    sectionName.toLowerCase().includes('project') ||
    sectionName.toLowerCase().includes('portfolio')
  ) {
    title = item.metadata.title || ''
    description = item.metadata.description || ''
    subtitle = item.metadata.category || item.metadata.subtitle || ''
  }
  // Certifications or Education
  else if (
    sectionName.toLowerCase().includes('certification') ||
    sectionName.toLowerCase().includes('education')
  ) {
    title = item.metadata.title || item.metadata.degree || item.metadata.certificate || ''
    subtitle = item.metadata.issuer || item.metadata.institution || item.metadata.school || ''
    description = item.metadata.description || ''
    dateDisplay = item.metadata.date || item.metadata.year || ''

    // If date range is provided
    if (!dateDisplay && (item.metadata.startDate || item.metadata.start_date)) {
      const startDate = item.metadata.startDate || item.metadata.start_date || ''
      const endDate = item.metadata.endDate || item.metadata.end_date || ''
      const current = item.metadata.current === 'true' || item.metadata.current === true
      dateDisplay = startDate
        ? `${formatDate(startDate)} - ${current ? 'Present' : endDate ? formatDate(endDate) : ''}`
        : ''
    }
  }
  // Languages
  else if (sectionName.toLowerCase().includes('language')) {
    title = item.metadata.name || ''
    subtitle = item.metadata.proficiency || ''
    const level = item.metadata.level ? `(${item.metadata.level}%)` : ''
    description = level ? `${subtitle} ${level}` : subtitle
  }
  // Default / Other sections
  else {
    title = item.metadata.title || Object.values(item.metadata)[0] || ''
    subtitle = item.metadata.subtitle || ''
    description = item.metadata.description || ''

    // Try to extract date information if available
    if (item.metadata.date || item.metadata.year) {
      dateDisplay = item.metadata.date || item.metadata.year || ''
    } else if (item.metadata.startDate || item.metadata.start_date) {
      const startDate = item.metadata.startDate || item.metadata.start_date || ''
      const endDate = item.metadata.endDate || item.metadata.end_date || ''
      const current = item.metadata.current === 'true' || item.metadata.current === true
      dateDisplay = startDate
        ? `${formatDate(startDate)} - ${current ? 'Present' : endDate ? formatDate(endDate) : ''}`
        : ''
    }
  }

  // Check if this is a portfolio or project type
  const isPortfolioOrProject =
    sectionName.toLowerCase().includes('portfolio') || sectionName.toLowerCase().includes('project')

  return (
    <View style={styles.experience}>
      <View style={styles.experienceHeader}>
        <Text style={styles.jobTitle}>{title}</Text>
        {dateDisplay && <Text style={styles.dates}>{dateDisplay}</Text>}
      </View>
      {subtitle && <Text style={styles.companyName}>{subtitle}</Text>}
      {description && <Text style={styles.description}>{description}</Text>}

      {/* Handle achievements or bullet points if they exist */}
      {item.metadata.achievements && (
        <View style={styles.achievements}>
          {item.metadata.achievements.split('\n').map((achievement: string, idx: number) => (
            <Text key={idx} style={styles.achievement}>
              • {achievement.trim()}
            </Text>
          ))}
        </View>
      )}

      {/* For projects/portfolio: show technologies */}
      {isPortfolioOrProject && item.metadata.tags && (
        <Text style={styles.technologies}>
          Technologies:{' '}
          {Array.isArray(item.metadata.tags) ? item.metadata.tags.join(', ') : item.metadata.tags}
        </Text>
      )}

      {/* For projects/portfolio: show links */}
      {isPortfolioOrProject && (item.metadata.url || item.metadata.repo) && (
        <View style={styles.projectLinks}>
          {item.metadata.url && (
            <Text style={styles.projectLink}>
              URL: <Link src={item.metadata.url}>{item.metadata.url}</Link>
            </Text>
          )}
          {item.metadata.repo && (
            <Text style={styles.projectLink}>
              Repository: <Link src={item.metadata.repo}>{item.metadata.repo}</Link>
            </Text>
          )}
        </View>
      )}
    </View>
  )
}

const LanguagesSection = ({ section }: { section: UserProfile['user_profile_sections'][0] }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{section.name}</Text>
    <View style={styles.languagesContainer}>
      {section.user_profile_section_items.map((item, index) => (
        <Text key={index} style={styles.languageItem}>
          <Text style={styles.languageName}>{item.metadata.name}: </Text>
          <Text style={styles.languageLevel}>
            {item.metadata.proficiency}
            {/* {item.metadata.level ? ` (${item.metadata.level}%)` : ''} */}
          </Text>
        </Text>
      ))}
    </View>
  </View>
)

const ProfileSection = ({ section }: { section: UserProfile['user_profile_sections'][0] }) => {
  // Special handling for languages section
  if (section.slug === 'languages' || section.name.toLowerCase().includes('language')) {
    return <LanguagesSection section={section} />
  }

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{section.name}</Text>
      {section.user_profile_section_items.map((item, index) => (
        <ProfileSectionItem key={index} item={item} sectionName={section.name} />
      ))}
    </View>
  )
}

export const ResumeTemplate = ({ profile }: ResumeTemplateProps) => {
  // Extract settings from profile
  const settings = profile.user_profile_settings?.metadata?.resume || {
    showSkills: true,
    showExperience: true,
    showEducation: true,
    showProjects: true,
    showCertifications: true,
    showAchievements: true,
    showPublications: true,
    showLanguages: true,
    showVolunteer: true
  }

  // Extract skills
  const skills = extractSkills(profile)

  // Group sections by type
  const experienceSections = profile.user_profile_sections.filter(
    (section) =>
      section.slug === 'experience' ||
      section.slug === 'work-experience' ||
      section.name.toLowerCase().includes('experience')
  )

  const projectSections = profile.user_profile_sections.filter(
    (section) => section.slug === 'projects' || section.name.toLowerCase().includes('project')
  )

  const educationSections = profile.user_profile_sections.filter(
    (section) => section.slug === 'education' || section.name.toLowerCase().includes('education')
  )

  const certificationSections = profile.user_profile_sections.filter(
    (section) =>
      section.slug === 'certifications' || section.name.toLowerCase().includes('certification')
  )

  const languageSections = profile.user_profile_sections.filter(
    (section) => section.slug === 'languages' || section.name.toLowerCase().includes('language')
  )

  const portfolioSections = profile.user_profile_sections.filter(
    (section) =>
      section.slug === 'design-portfolio' ||
      section.slug === 'portfolio' ||
      section.name.toLowerCase().includes('portfolio')
  )

  // Other sections that don't fit the categories above
  const otherSections = profile.user_profile_sections.filter(
    (section) =>
      ![
        'experience',
        'work-experience',
        'projects',
        'skills',
        'education',
        'certifications',
        'languages',
        'design-portfolio',
        'portfolio'
      ].includes(section.slug) &&
      !section.name
        .toLowerCase()
        .match(/(experience|project|skill|education|certification|language|portfolio)/)
  )

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        {/* Main content */}
        <MainHeader profile={profile} />

        {/* Essential content */}
        <ProfessionalSummary bio={profile.bio} />

        {settings.showSkills && skills.length > 0 && <SkillsSection skills={skills} />}

        {settings.showExperience &&
          experienceSections.map((section, index) => (
            <ProfileSection key={`exp-${index}`} section={section} />
          ))}

        {settings.showProjects &&
          projectSections.map((section, index) => (
            <ProfileSection key={`proj-${index}`} section={section} />
          ))}

        {settings.showEducation &&
          educationSections.map((section, index) => (
            <ProfileSection key={`edu-${index}`} section={section} />
          ))}

        {settings.showCertifications &&
          certificationSections.map((section, index) => (
            <ProfileSection key={`cert-${index}`} section={section} />
          ))}

        {settings.showLanguages &&
          languageSections.map((section, index) => (
            <ProfileSection key={`lang-${index}`} section={section} />
          ))}

        {settings.showPortfolio &&
          portfolioSections.map((section, index) => (
            <ProfileSection key={`port-${index}`} section={section} />
          ))}

        {otherSections.map((section, index) => (
          <ProfileSection key={`other-${index}`} section={section} />
        ))}

        {/* Page number */}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          fixed
        />

        {/* Header for continuation pages - only shows on pages > 1 */}
        <ContinuationHeader profile={profile} />
      </Page>
    </Document>
  )
}
