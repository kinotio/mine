'use client'

import { useState } from 'react'
import { Eye, FileText, ZoomIn, ZoomOut } from 'lucide-react'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResumeTemplate } from '@/components/profile/pdf/resume'

import { UserProfile } from '@/lib/types/profile'

interface ResumeDialogProps {
  profile: UserProfile
  trigger?: React.ReactNode
}

export const ResumeDialog = ({ profile }: ResumeDialogProps) => {
  const [scale, setScale] = useState(1.0)
  const [open, setOpen] = useState(false)
  const [downloadOpen, setDownloadOpen] = useState(false)
  const [fileName, setFileName] = useState(profile.name.replace(/\s+/g, '_'))

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.2, 2.0))
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5))

  return (
    <>
      {/* Preview Button */}
      {profile.user_profile_settings.metadata.general.showPreviewResume ? (
        <Button
          onClick={() => setOpen(true)}
          className='w-full bg-[#4cc9f0] hover:bg-[#3db8df] text-black font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-in-out'
        >
          <Eye className='h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2' />
          <span className='text-sm sm:text-base'>Preview Resume</span>
        </Button>
      ) : null}

      {/* Download Button */}
      {profile.user_profile_settings.metadata.general.showDownloadButton ? (
        <Button
          onClick={() => setDownloadOpen(true)}
          className='w-full bg-[#ff6b6b] hover:bg-[#ff5252] text-black font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-in-out'
        >
          <FileText className='h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2' />
          <span className='text-sm sm:text-base'>Download Resume</span>
        </Button>
      ) : null}

      {/* Download Dialog */}
      <Dialog open={downloadOpen} onOpenChange={setDownloadOpen}>
        <DialogContent className='bg-white max-w-[95vw] sm:max-w-[500px] border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-3 sm:p-6'>
          <DialogHeader>
            <DialogTitle className='text-xl sm:text-2xl font-black'>Download Resume</DialogTitle>
          </DialogHeader>
          <div className='space-y-4 flex flex-col'>
            <div>
              <label htmlFor='fileName' className='block text-sm font-medium mb-2'>
                File Name
              </label>
              <Input
                id='fileName'
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className='border-[2px] border-black'
              />
            </div>
            <PDFDownloadLink
              document={<ResumeTemplate profile={profile} />}
              fileName={`${fileName}.pdf`}
            >
              {({ loading }) => (
                <Button
                  className='w-full bg-[#ff6b6b] hover:bg-[#ff5252] text-black font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-in-out'
                  disabled={loading}
                  onClick={() => setDownloadOpen(false)}
                >
                  {loading ? 'Generating...' : 'Download'}
                </Button>
              )}
            </PDFDownloadLink>
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='bg-white max-w-[95vw] sm:max-w-[90vw] md:max-w-[900px] h-[90vh] sm:h-auto border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-3 sm:p-6'>
          <DialogHeader>
            <DialogTitle className='text-xl sm:text-2xl font-black'>Resume Preview</DialogTitle>
          </DialogHeader>

          <div className='flex flex-col'>
            {/* PDF Preview with floating toolbar */}
            <div className='p-2 sm:p-4 md:p-8 h-[60vh] sm:h-[70vh] md:h-[700px] overflow-y-auto relative border-black border-[3px]'>
              <div className='flex justify-center'>
                <div
                  style={{
                    transform: `scale(${scale})`,
                    transformOrigin: 'top center',
                    width: '100%',
                    maxWidth: '600px',
                    height: 'auto'
                  }}
                >
                  {/* Responsive PDFViewer */}
                  <div className='sticky top-0'>
                    <PDFViewer
                      width='100%'
                      height={window.innerWidth < 640 ? 600 : 845}
                      showToolbar={false}
                      className='pdf-viewer-no-scroll'
                    >
                      <ResumeTemplate profile={profile} />
                    </PDFViewer>
                  </div>
                </div>
              </div>

              {/* Floating toolbar - repositioned for mobile */}
              <div className='fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-10'>
                <div className='bg-[#f6f8fa] border-[2px] sm:border-[3px] border-black p-2 sm:p-3 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2 sm:gap-3'>
                  <Button
                    size='sm'
                    variant='neutral'
                    className='border-[1px] sm:border-[2px] border-black h-6 w-6 sm:h-8 sm:w-8 p-0'
                    onClick={handleZoomOut}
                  >
                    <ZoomOut className='h-3 w-3 sm:h-4 sm:w-4' />
                  </Button>
                  <span className='text-xs sm:text-sm font-medium'>{Math.round(scale * 100)}%</span>
                  <Button
                    size='sm'
                    variant='neutral'
                    className='border-[1px] sm:border-[2px] border-black h-6 w-6 sm:h-8 sm:w-8 p-0'
                    onClick={handleZoomIn}
                  >
                    <ZoomIn className='h-3 w-3 sm:h-4 sm:w-4' />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
