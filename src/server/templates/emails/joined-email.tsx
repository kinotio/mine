import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Row,
  Column,
  Text,
  Hr,
  Link,
  Button
} from '@react-email/components'

import { Mine, Kinotio } from '@/components/icons'

interface JoinedEmaillProps {
  username: string
  email: string
  joinDate: string
  profileUrl?: string
}

export const JoinedEmail: React.FC<JoinedEmaillProps> = ({
  username,
  email,
  joinDate,
  profileUrl = '#'
}) => {
  return (
    <Html>
      <Head />
      <Body
        style={{
          fontFamily: 'Arial, sans-serif',
          backgroundColor: '#ffffff',
          margin: '0',
          padding: '0'
        }}
      >
        <Container
          style={{
            maxWidth: '600px',
            margin: '30px auto 30px auto',
            backgroundColor: '#ffffff',
            border: '1px solid #e1e1e1',
            borderRadius: '5px',
            padding: '20px'
          }}
        >
          {/* Header */}
          <Section style={{ padding: '0 0 20px', backgroundColor: '#ffffff' }}>
            <Row>
              <Column>
                <Mine width={100} height={50} />
              </Column>
              <Column style={{ textAlign: 'right' }}>
                <Text style={{ fontSize: '14px', color: '#666666', margin: '0' }}>
                  New User Notification
                </Text>
                <Text style={{ fontSize: '14px', color: '#666666', margin: '0' }}>
                  {new Date().toLocaleDateString()}
                </Text>
              </Column>
            </Row>
            <Hr style={{ borderColor: '#e1e1e1', margin: '20px 0' }} />
          </Section>

          {/* Main Content */}
          <Section style={{ backgroundColor: '#ffffff' }}>
            <Text
              style={{
                fontSize: '22px',
                fontWeight: 'bold',
                color: '#333333',
                marginBottom: '20px'
              }}
            >
              New User Registration
            </Text>

            <Section
              style={{
                backgroundColor: '#f9f9f9',
                padding: '15px',
                borderRadius: '4px',
                marginBottom: '20px',
                border: '1px solid #e8e8e8'
              }}
            >
              <Text style={{ margin: '0 0 10px 0' }}>
                <strong>Username:</strong> {username}
              </Text>
              <Text style={{ margin: '0 0 10px 0' }}>
                <strong>Email:</strong> {email}
              </Text>
              <Text style={{ margin: '0 0 10px 0' }}>
                <strong>Join Date:</strong> {joinDate}
              </Text>
            </Section>

            <Section style={{ textAlign: 'center', padding: '10px 0 20px' }}>
              <Button
                href={profileUrl}
                style={{
                  backgroundColor: '#0366d6',
                  color: '#ffffff',
                  padding: '12px 20px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                View User Profile
              </Button>
            </Section>

            <Section
              style={{
                padding: '10px',
                backgroundColor: '#f5f9ff',
                border: '1px solid #0366d6',
                borderLeft: '4px solid #0366d6',
                marginBottom: '20px'
              }}
            >
              <Text style={{ margin: '0', fontSize: '14px' }}>
                A new user has joined your platform. You may want to review their profile and send
                them a welcome message.
              </Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={{ backgroundColor: '#ffffff' }}>
            <Hr style={{ borderColor: '#e1e1e1', margin: '20px 0' }} />
            <Section style={{ textAlign: 'center', backgroundColor: '#ffffff' }}>
              <Kinotio width={100} height={50} />
              <Text style={{ fontSize: '12px', color: '#666666', margin: '10px 0' }}>
                © {new Date().getFullYear()} kinotio.io. All rights reserved.
              </Text>
              <Row>
                <Column style={{ textAlign: 'center' }}>
                  <Link
                    href='#'
                    style={{
                      color: '#666666',
                      textDecoration: 'none',
                      fontSize: '12px',
                      margin: '0 10px'
                    }}
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href='#'
                    style={{
                      color: '#666666',
                      textDecoration: 'none',
                      fontSize: '12px',
                      margin: '0 10px'
                    }}
                  >
                    Terms of Service
                  </Link>
                  <Link
                    href='#'
                    style={{
                      color: '#666666',
                      textDecoration: 'none',
                      fontSize: '12px',
                      margin: '0 10px'
                    }}
                  >
                    Contact Us
                  </Link>
                </Column>
              </Row>
              <Text style={{ fontSize: '12px', color: '#666666', margin: '10px 0' }}>
                {`You're receiving this email because you're an administrator of the platform.`}
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
