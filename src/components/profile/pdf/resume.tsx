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
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5
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

export const ResumeTemplate = ({ profile }: ResumeTemplateProps) => (
  <Document>
    <Page size='A4' style={styles.page}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.title}>{profile.title}</Text>
        <Text style={styles.contact}>
          {profile.location} | {profile.email} | {profile.website}
        </Text>
      </View>

      {/* Professional Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Summary</Text>
        <Text style={styles.content}>{profile.bio}</Text>
      </View>

      {/* Links */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Links</Text>
        {profile.github && <Text style={styles.content}>GitHub: {profile.github}</Text>}
        {profile.linkedin && <Text style={styles.content}>LinkedIn: {profile.linkedin}</Text>}
      </View>
    </Page>
  </Document>
)
