import { ProfileProjects } from '@/components/mods/profile/profile-projects'
import { ProfileSkills } from '@/components/mods/profile/profile-skills'
import { ProfileWorks } from '@/components/mods/profile/profile-works'
import { ProfileCustomSection } from '@/components/mods/profile/profile-custom-section'

const Page = () => {
  return (
    <>
      <ProfileProjects />
      <ProfileSkills />
      <ProfileWorks />
      <ProfileCustomSection />
    </>
  )
}

export default Page
