import { ProfileLayout } from '@/components/layouts/profile-layout'

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return <ProfileLayout>{children}</ProfileLayout>
}
export default Layout
