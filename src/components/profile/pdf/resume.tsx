import { Document, Page, Text, View, Link } from '@react-pdf/renderer'

import { styles } from '@/components/profile/pdf/config'
import { formatDate, removeEmojis } from '@/components/profile/pdf/helpers'
import { UserProfile } from '@/lib/types/profile'

interface ResumeTemplateProps {
  profile: UserProfile
}

const MainHeader = ({ profile }: { profile: UserProfile }) => (
  <View style={styles.header} fixed>
    <Text style={styles.name}>{profile.name}</Text>
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
  <View style={styles.continuationHeader} fixed render={({ pageNumber }) => pageNumber > 1}>
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
    name: item.metadata.name || item.metadata.skill || Object.values(item.metadata)[0] || ''
  }))
}

const SkillsSection = ({ skills }: { skills: { name: string }[] }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Key Competencies</Text>
    <View style={styles.skillsContainer}>
      {skills.map((skill, index) => (
        <Text key={index} style={styles.skill}>
          {skill.name}
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
    metadata: { [key: string]: string }
  }
  sectionName: string
}) => {
  // Extract common fields
  const title = item.metadata.title || item.metadata.role || item.metadata.position || ''
  const subtitle =
    item.metadata.subtitle || item.metadata.company || item.metadata.organization || ''
  const description = item.metadata.description || ''
  const startDate = item.metadata.startDate || item.metadata.start_date || ''
  const endDate = item.metadata.endDate || item.metadata.end_date || ''
  const current = item.metadata.current === 'true'
  const dateDisplay = startDate
    ? `${formatDate(startDate)} - ${current ? 'Present' : endDate ? formatDate(endDate) : ''}`
    : ''

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
          {item.metadata.achievements.split('\n').map((achievement, idx) => (
            <Text key={idx} style={styles.achievement}>
              • {achievement.trim()}
            </Text>
          ))}
        </View>
      )}

      {/* For projects: show technologies */}
      {sectionName.toLowerCase().includes('project') && item.metadata.technologies && (
        <Text style={styles.technologies}>Technologies: {item.metadata.technologies}</Text>
      )}

      {/* For projects: show links */}
      {sectionName.toLowerCase().includes('project') &&
        (item.metadata.url || item.metadata.repo) && (
          <View style={styles.projectLinks}>
            {item.metadata.url && (
              <Text style={styles.projectLink}>
                Demo: <Link src={item.metadata.url}>{item.metadata.url}</Link>
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

const ProfileSection = ({ section }: { section: UserProfile['user_profile_sections'][0] }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{section.name}</Text>
    {section.user_profile_section_items.map((item, index) => (
      <ProfileSectionItem key={index} item={item} sectionName={section.name} />
    ))}
  </View>
)

export const ResumeTemplate = ({ profile }: ResumeTemplateProps) => {
  // Extract skills
  const skills = extractSkills(profile)

  // Group sections by type
  const experienceSections = profile.user_profile_sections.filter(
    (section) => section.slug === 'experience' || section.name.toLowerCase().includes('experience')
  )

  const projectSections = profile.user_profile_sections.filter(
    (section) => section.slug === 'projects' || section.name.toLowerCase().includes('project')
  )

  const educationSections = profile.user_profile_sections.filter(
    (section) =>
      section.slug === 'education' ||
      section.name.toLowerCase().includes('education') ||
      section.name.toLowerCase().includes('certification')
  )

  const otherSections = profile.user_profile_sections.filter(
    (section) =>
      !section.slug.match(/(experience|projects|skills|education)/) &&
      !section.name.toLowerCase().match(/(experience|project|skill|education|certification)/)
  )

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        {/* Main content */}
        <MainHeader profile={profile} />

        {/* Essential content */}
        <ProfessionalSummary bio={profile.bio} />

        {skills.length > 0 && <SkillsSection skills={skills} />}

        {/* Content sections */}
        {experienceSections.map((section, index) => (
          <ProfileSection key={`exp-${index}`} section={section} />
        ))}

        {projectSections.map((section, index) => (
          <ProfileSection key={`proj-${index}`} section={section} />
        ))}

        {educationSections.map((section, index) => (
          <ProfileSection key={`edu-${index}`} section={section} />
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
