export interface SettingsProps {
  trigger?: React.ReactNode
}

// Define a schema for the form data
export interface SettingsFormData {
  general: {
    showPreviewResume: boolean
    showDownloadButton: boolean
  }
  // preview: {
  //   showContactInfo: boolean
  //   showSocialLinks: boolean
  //   showProfilePhoto: boolean
  //   enablePrint: boolean
  // }
  // download: {
  //   includeCoverLetter: boolean
  //   highResolution: boolean
  //   includePortfolio: boolean
  //   fileFormat: 'pdf' | 'docx' | 'both'
  // }
  // sections: {
  //   skills: boolean
  //   experience: boolean
  //   education: boolean
  //   projects: boolean
  //   certifications: boolean
  //   achievements: boolean
  //   publications: boolean
  //   languages: boolean
  //   volunteer: boolean
  // }
}

export type GeneralSettingKey = keyof SettingsFormData['general']
