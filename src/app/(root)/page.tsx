import { Hero } from '@/components/root/hero'
import { Features } from '@/components/root/features'
import { HowItWorksSection } from '@/components/root/how-it-works'
import { Showcase } from '@/components/root/showcase'
import { Faq } from '@/components/root/faq'

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
