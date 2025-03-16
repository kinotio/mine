import { Document, Page, Text, View, Link } from '@react-pdf/renderer'

import { styles } from '@/components/profile/pdf/config'
import { formatDate, removeEmojis } from '@/components/profile/pdf/helpers'
import { WorkExperience, Project, CustomSectionItem } from '@/lib/types/profile'
import { UserProfile } from '@/lib/types/profile'

interface ResumeTemplateProps {
  profile: UserProfile
}

const PageHeader = ({ profile }: { profile: UserProfile }) => (
  <View style={styles.pageHeader} fixed>
    <Text style={styles.headerName}>{profile.name}</Text>
    <Text style={styles.headerTitle}>{profile.title}</Text>
  </View>
)

const MainHeader = ({ profile }: { profile: UserProfile }) => (
  <View style={styles.header}>
    <Text style={styles.name}>{profile.name}</Text>
    <Text style={styles.title}>{profile.title}</Text>
    <Text style={styles.contact}>
      {profile.location} | {profile.email} {profile.website && `| ${profile.website}`}
    </Text>
    <View style={styles.socialLinks}>
      {profile.github && <Text style={styles.socialLink}>GitHub: @{profile.github}</Text>}
      {profile.linkedin && <Text style={styles.socialLink}>LinkedIn: @{profile.linkedin}</Text>}
      {profile.x && <Text style={styles.socialLink}>X: @{profile.x}</Text>}
      {profile.bluesky && <Text style={styles.socialLink}>Bluesky: @{profile.bluesky}</Text>}
    </View>
  </View>
)

const ProfessionalSummary = ({ bio, isLong }: { bio?: string; isLong: boolean }) => {
  const cleanBio = removeEmojis(bio)

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Professional Summary</Text>
      <Text style={styles.content}>{isLong ? cleanBio.slice(0, 500) + '...' : cleanBio}</Text>
    </View>
  )
}

const ProfessionalSummaryContinued = ({ bio }: { bio?: string }) => {
  const cleanBio = removeEmojis(bio)

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Professional Summary (Continued)</Text>
      <Text style={styles.content}>{cleanBio.slice(500)}</Text>
    </View>
  )
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

const JobExperience = ({ job, index }: { job: WorkExperience; index: number }) => (
  <View key={index} style={styles.experience}>
    <View style={styles.experienceHeader}>
      <Text style={styles.jobTitle}>{job.role}</Text>
      <Text style={styles.dates}>
        {formatDate(job.startDate)} - {job.current ? 'Present' : formatDate(job.endDate || '')}
      </Text>
    </View>
    <Text style={styles.companyName}>{job.company}</Text>
    <Text style={styles.description}>{job.description}</Text>
    {job.achievements && job.achievements.length > 0 && (
      <View style={styles.achievements}>
        {job.achievements.map((achievement, idx) => (
          <Text key={idx} style={styles.achievement}>
            • {achievement}
          </Text>
        ))}
      </View>
    )}
  </View>
)

const WorkExperienceSection = ({
  experiences,
  continued = false
}: {
  experiences: WorkExperience[]
  continued?: boolean
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>
      Professional Experience{continued ? ' (Continued)' : ''}
    </Text>
    {experiences.map((job, index) => (
      <JobExperience key={index} job={job} index={index} />
    ))}
  </View>
)

const ProjectItem = ({ project, index }: { project: Project; index: number }) => (
  <View key={index} style={styles.project}>
    <Text style={styles.projectTitle}>{project.title}</Text>
    <Text style={styles.description}>{project.description}</Text>
    {project.technologies && project.technologies.length > 0 && (
      <Text style={styles.technologies}>Technologies: {project.technologies.join(', ')}</Text>
    )}
    {(project.url || project.repo) && (
      <View style={styles.projectLinks}>
        {project.url && (
          <Text style={styles.projectLink}>
            Demo: <Link src={project.url}>{project.url}</Link>
          </Text>
        )}
        {project.repo && (
          <Text style={styles.projectLink}>
            Repository: <Link src={project.repo}>{project.repo}</Link>
          </Text>
        )}
      </View>
    )}
  </View>
)

const ProjectsSection = ({ projects }: { projects: Project[] }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Projects</Text>
    {projects.map((project, index) => (
      <ProjectItem key={index} project={project} index={index} />
    ))}
  </View>
)

const CustomSectionComponent = ({
  section,
  index,
  isEducation = false
}: {
  section: { title: string; items: CustomSectionItem[] }
  index: number
  isEducation?: boolean
}) => (
  <View key={index} style={styles.section}>
    <Text style={styles.sectionTitle}>{section.title}</Text>
    {section.items.map((item, idx) => (
      <View key={idx} style={isEducation ? styles.educationItem : styles.customItem}>
        <Text style={isEducation ? styles.educationTitle : styles.customItemTitle}>
          {item.title}
        </Text>
        {item.subtitle && (
          <Text style={isEducation ? styles.educationSubtitle : styles.customItemSubtitle}>
            {item.subtitle}
          </Text>
        )}
        {item.date && <Text style={styles.dates}>{item.date}</Text>}
        {item.description && <Text style={styles.description}>{item.description}</Text>}
      </View>
    ))}
  </View>
)

export const ResumeTemplate = ({ profile }: ResumeTemplateProps) => {
  // Calculate if content needs multiple pages
  const longBio = profile.bio?.length > 500
  const hasProjects = profile.projects && profile.projects.length > 0
  const hasWorkExperience = profile.workExperience && profile.workExperience.length > 0
  const hasCustomSections = profile.customSections && profile.customSections.length > 0
  const needsSecondPage = hasProjects || (hasWorkExperience && profile.workExperience.length > 2)
  const needsThirdPage = hasCustomSections && profile.customSections.length > 2

  // Filter custom sections by category
  const educationSections =
    profile.customSections?.filter(
      (section) =>
        section.title.toLowerCase().includes('education') ||
        section.title.toLowerCase().includes('certification')
    ) || []

  const activitiesSections =
    profile.customSections?.filter(
      (section) =>
        section.title.toLowerCase().includes('activities') ||
        section.title.toLowerCase().includes('volunteer')
    ) || []

  const otherSections =
    profile.customSections?.filter(
      (section) =>
        !section.title.toLowerCase().includes('education') &&
        !section.title.toLowerCase().includes('certification') &&
        !section.title.toLowerCase().includes('activities') &&
        !section.title.toLowerCase().includes('volunteer')
    ) || []

  return (
    <Document>
      {/* First Page */}
      <Page size='A4' style={styles.page}>
        <MainHeader profile={profile} />
        <ProfessionalSummary bio={profile.bio} isLong={longBio} />

        {profile.skills && profile.skills.length > 0 && <SkillsSection skills={profile.skills} />}

        {hasWorkExperience && (
          <WorkExperienceSection experiences={profile.workExperience.slice(0, 2)} />
        )}
      </Page>

      {/* Second Page */}
      {(needsSecondPage || longBio) && (
        <Page size='A4' style={styles.page}>
          <PageHeader profile={profile} />

          {longBio && <ProfessionalSummaryContinued bio={profile.bio} />}

          {hasWorkExperience && profile.workExperience.length > 2 && (
            <WorkExperienceSection experiences={profile.workExperience.slice(2)} continued={true} />
          )}

          {hasProjects && <ProjectsSection projects={profile.projects} />}
        </Page>
      )}

      {/* Third Page */}
      {needsThirdPage && (
        <Page size='A4' style={styles.page}>
          <PageHeader profile={profile} />

          {educationSections.map((section, index) => (
            <CustomSectionComponent
              key={index}
              section={section}
              index={index}
              isEducation={true}
            />
          ))}

          {activitiesSections.map((section, index) => (
            <CustomSectionComponent key={index} section={section} index={index} />
          ))}

          {otherSections.map((section, index) => (
            <CustomSectionComponent key={index} section={section} index={index} />
          ))}
        </Page>
      )}
    </Document>
  )
}
