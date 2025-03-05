import { Hero } from '@/components/mods/root/hero'
import { Features } from '@/components/mods/root/features'
import { HowItWorksSection } from '@/components/mods/root/how-it-works'
import { Showcase } from '@/components/mods/root/showcase'
import { Faq } from '@/components/mods/root/faq'

const Page = () => {
  return (
    <div>
      <Hero />
      <Features />
      <HowItWorksSection />
      <Showcase />
      <Faq />
    </div>
  )
}

export default Page
