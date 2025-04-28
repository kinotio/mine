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
  Link
} from '@react-email/components'

import { Mine, Kinotio } from '@/components/icons'

interface FeedbackEmailProps {
  email: string
  feedback: string
  rating: number
}

export const FeedbackEmail: React.FC<FeedbackEmailProps> = ({ email, feedback, rating }) => {
  const generateRatingStars = (rating: number): string => {
    const filledStars = '★'.repeat(rating)
    const emptyStars = '☆'.repeat(5 - rating)
    return filledStars + emptyStars
  }

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
                  Feedback Notification
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
              New Feedback Submission
            </Text>

            <Section
              style={{
                backgroundColor: '#ffffff',
                padding: '15px',
                borderRadius: '4px',
                marginBottom: '20px',
                border: '1px solid #e8e8e8'
              }}
            >
              <Text style={{ margin: '0 0 10px 0' }}>
                <strong>From:</strong> {email}
              </Text>
              <Text style={{ margin: '0 0 10px 0' }}>
                <strong>Rating:</strong>{' '}
                <span style={{ color: '#FFD700', letterSpacing: '2px' }}>
                  {generateRatingStars(rating)}
                </span>
                <span style={{ marginLeft: '5px' }}>({rating}/5)</span>
              </Text>
              <Text style={{ margin: '0 0 5px 0' }}>
                <strong>Feedback:</strong>
              </Text>
              <Section
                style={{
                  backgroundColor: '#ffffff',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #e1e1e1'
                }}
              >
                <Text style={{ margin: '0' }}>{feedback}</Text>
              </Section>
            </Section>

            <Section
              style={{
                padding: '10px',
                backgroundColor: '#ffffff',
                border: '1px solid #0366d6',
                borderLeft: '4px solid #0366d6',
                marginBottom: '20px'
              }}
            >
              <Text style={{ margin: '0', fontSize: '14px' }}>
                This is an automated notification. Please do not reply directly to this email.
              </Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={{ backgroundColor: '#ffffff' }}>
            <Hr style={{ borderColor: '#e1e1e1', margin: '20px 0' }} />
            <Section style={{ textAlign: 'center', backgroundColor: '#ffffff' }}>
              <Kinotio width={100} height={50} />
              <Text style={{ fontSize: '12px', color: '#666666', margin: '10px 0' }}>
                © {new Date().getFullYear()} kinotio. All rights reserved.
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
                {`You're receiving this email because you're an administrator of the feedback system.`}
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
