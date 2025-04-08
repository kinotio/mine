export interface SettingsProps {
  trigger?: React.ReactNode
}

// Define a schema for the form data
export interface SettingsFormData {
  general: {
    showPreviewResume: boolean
    showDownloadButton: boolean
  }
  resume: {
    showEducation: boolean
    showVolunteer: boolean
    showLanguages: boolean
    showSkills: boolean
    showProjects: boolean
    showPortfolio: boolean
    showExperience: boolean
    showPublications: boolean
    showCertifications: boolean
    showAchievements: boolean
  }
}

export type GeneralSettingKey = keyof SettingsFormData['general']
export type ResumeSettingKey = keyof SettingsFormData['resume']
