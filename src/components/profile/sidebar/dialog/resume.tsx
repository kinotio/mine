'use client'

import { useState } from 'react'
import { Eye, FileText, ZoomIn, ZoomOut } from 'lucide-react'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ResumeTemplate } from '@/components/profile/pdf/resume'

import { UserProfile } from '@/lib/types/profile'

interface ResumeDialogProps {
  profile: UserProfile
  trigger?: React.ReactNode
}

export function ResumeDialog({ profile }: ResumeDialogProps) {
  const [scale, setScale] = useState(1.0)
  const [open, setOpen] = useState(false)

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.2, 2.0))
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5))

  return (
    <>
      {/* Preview Button */}
      <Button
        onClick={() => setOpen(true)}
        className='w-full bg-[#4cc9f0] hover:bg-[#3db8df] text-black font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-in-out'
      >
        <Eye className='h-5 w-5 mr-2' />
        Preview Resume
      </Button>

      {/* Download Button */}
      <PDFDownloadLink
        document={<ResumeTemplate profile={profile} />}
        fileName={`${profile.name.replace(/\s+/g, '_')}.pdf`}
      >
        {({ loading }) => (
          <Button
            className='w-full bg-[#ff6b6b] hover:bg-[#ff5252] text-black font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-in-out'
            disabled={loading}
          >
            {loading ? (
              'Generating...'
            ) : (
              <>
                <FileText className='h-5 w-5 mr-2' />
                Download Resume
              </>
            )}
          </Button>
        )}
      </PDFDownloadLink>

      {/* Preview Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='bg-white max-w-[900px] w-[90vw] border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]'>
          <DialogHeader>
            <DialogTitle className='text-2xl font-black'>Resume Preview</DialogTitle>
          </DialogHeader>

          <div className='flex flex-col'>
            {/* PDF Viewer Toolbar */}
            <div className='bg-[#f6f8fa] border-[3px] border-black p-3 flex justify-between items-center'>
              <div className='flex items-center gap-2'>
                <span className='font-medium'>Preview</span>
              </div>
              <div className='flex items-center gap-2'>
                <Button
                  size='sm'
                  variant='neutral'
                  className='border-[2px] border-black h-8 w-8 p-0'
                  onClick={handleZoomOut}
                >
                  <ZoomOut className='h-4 w-4' />
                </Button>
                <span className='font-medium'>{Math.round(scale * 100)}%</span>
                <Button
                  size='sm'
                  variant='neutral'
                  className='border-[2px] border-black h-8 w-8 p-0'
                  onClick={handleZoomIn}
                >
                  <ZoomIn className='h-4 w-4' />
                </Button>
              </div>
            </div>

            {/* PDF Preview */}
            <div className='p-8 h-[700px] overflow-y-auto relative'>
              <div className='flex justify-center'>
                <div
                  style={{
                    transform: `scale(${scale})`,
                    transformOrigin: 'top center',
                    width: '600px' // Match PDFViewer width
                  }}
                >
                  {/* Use position absolute to prevent internal scroll */}
                  <div className='sticky top-0'>
                    <PDFViewer
                      width={600}
                      height={800}
                      showToolbar={false}
                      className='pdf-viewer-no-scroll'
                    >
                      <ResumeTemplate profile={profile} />
                    </PDFViewer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
