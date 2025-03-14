import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

import { UserProfile } from '@/lib/types/profile'

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica'
  },
  section: {
    marginBottom: 10
  },
  header: {
    marginBottom: 20
  },
  pageHeader: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5
  },
  headerName: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  headerTitle: {
    fontSize: 10,
    color: '#666'
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666'
  },
  contact: {
    fontSize: 10,
    color: '#333'
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 2
  },
  content: {
    fontSize: 11,
    lineHeight: 1.4
  }
})

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
      {profile.location} | {profile.email} | {profile.website}
    </Text>
  </View>
)

export const ResumeTemplate = ({ profile }: ResumeTemplateProps) => {
  const longContent = profile.bio?.length > 500 // Example threshold for multiple pages

  return (
    <Document>
      {/* First Page */}
      <Page size='A4' style={styles.page}>
        <MainHeader profile={profile} />

        {/* Professional Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.content}>
            {longContent ? profile.bio?.slice(0, 500) + '...' : profile.bio}
          </Text>
        </View>

        {/* Links */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Links</Text>
          {profile.github && <Text style={styles.content}>GitHub: {profile.github}</Text>}
          {profile.linkedin && <Text style={styles.content}>LinkedIn: {profile.linkedin}</Text>}
        </View>
      </Page>

      {/* Additional Page for Long Content */}
      {longContent && (
        <Page size='A4' style={styles.page}>
          <PageHeader profile={profile} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary (Continued)</Text>
            <Text style={styles.content}>{profile.bio?.slice(500)}</Text>
          </View>
        </Page>
      )}
    </Document>
  )
}
