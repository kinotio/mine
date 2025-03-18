'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { MessageSquare } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

import { FeedbackRating } from '@/components/profile/feedback/rating'

import { useToast } from '@/hooks/use-toast'

// Feedback form schema
const feedbackSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  feedback: z.string().min(10, { message: 'Feedback must be at least 10 characters' }),
  rating: z.number().min(1, { message: 'Please provide a rating' }).max(5)
})

type FeedbackFormValues = z.infer<typeof feedbackSchema>

interface FeedbackDialogProps {
  trigger?: React.ReactNode
}

export const FeedbackDialog = ({ trigger }: FeedbackDialogProps) => {
  const { toast } = useToast()

  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize form with react-hook-form and zod validation
  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      email: '',
      feedback: '',
      rating: 0
    }
  })

  // Form submission
  const onSubmit = async (data: FeedbackFormValues) => {
    setIsSubmitting(true)

    console.log('Feedback submitted:', data)

    // Show success message
    toast({
      title: 'Feedback submitted',
      description: "Thank you for your feedback! We'll review it shortly."
    })

    // Reset form and close dialog
    form.reset()
    setIsSubmitting(false)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className='bg-white text-black font-bold transition-all' variant='reverse'>
            <MessageSquare className='mr-2 h-5 w-5' />
            Feedback
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className='bg-white sm:max-w-[500px] border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-black'>Send Feedback</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 mt-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold'>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className='border-[2px] border-black'
                      placeholder='your@email.com'
                    />
                  </FormControl>
                  <FormMessage className='text-[#ff6b6b] font-medium' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='rating'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold'>Rating</FormLabel>
                  <FormControl>
                    <FeedbackRating value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage className='text-[#ff6b6b] font-medium' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='feedback'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold'>Your Feedback</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className='min-h-[150px] border-[2px] border-black'
                      placeholder='Tell us what you think about the profile or suggest improvements...'
                    />
                  </FormControl>
                  <FormMessage className='text-[#ff6b6b] font-medium' />
                </FormItem>
              )}
            />

            <div className='flex justify-end gap-3 pt-4 border-t-2 border-gray-200'>
              <Button
                type='button'
                variant='neutral'
                onClick={() => setOpen(false)}
                className='border-[2px] border-black font-bold hover:bg-gray-100'
              >
                Cancel
              </Button>
              <Button
                type='submit'
                disabled={isSubmitting}
                className='text-black font-bold transition-all'
              >
                {isSubmitting ? (
                  <>
                    <div className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent'></div>
                    Submitting...
                  </>
                ) : (
                  'Submit Feedback'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
