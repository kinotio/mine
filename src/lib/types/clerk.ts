export type ClerkUser = {
  id: string
  firstName: string | null
  lastName: string | null
  fullName: string | null
  username: string | null
  primaryEmailAddress: {
    emailAddress: string
    id: string
    linkedTo: Array<{
      type: string
      id: string
    }>
    verification: {
      status: string
    }
  } | null
  primaryPhoneNumber: {
    phoneNumber: string
    id: string
  } | null
  primaryWeb3Wallet: {
    web3Wallet: string
    id: string
  } | null
  imageUrl: string
  hasImage: boolean
  createdAt: Date
  updatedAt: Date
  lastSignInAt: Date | null
  externalId: string | null
}

export type ClerkUserMinimal = {
  id: string
  firstName: string | null
  lastName: string | null
  imageUrl: string
  username: string | null
  emailAddresses: Array<{
    id: string
    emailAddress: string
  }>
  primaryEmailAddress: {
    emailAddress: string
  } | null
}
