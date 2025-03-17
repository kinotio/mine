import { BookOpen, ExternalLink } from 'lucide-react'

interface PublicationCardProps {
  publication: {
    title: string
    publisher: string
    date: string
    description: string
    url?: string
  }
}

export const PublicationCard = ({ publication }: PublicationCardProps) => {
  return (
    <div className='w-[350px] bg-white border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-5 hover:translate-y-[-5px] hover:shadow-[5px_10px_0px_0px_rgba(0,0,0,1)] transition-all'>
      <div className='flex justify-between items-start mb-3'>
        <div className='flex items-center'>
          <div className='w-10 h-10 bg-[#3a86ff] rounded-full border-[2px] border-black mr-3 flex items-center justify-center'>
            <BookOpen className='h-5 w-5 text-white' />
          </div>
          <div className='bg-[#3a86ff] text-white px-2 py-1 text-sm font-bold border-[2px] border-black'>
            {publication.date}
          </div>
        </div>
        {publication.url && (
          <a
            href={publication.url}
            target='_blank'
            rel='noopener noreferrer'
            className='bg-white hover:bg-gray-100 text-black font-bold border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] p-2 rounded-md hover:translate-y-[-2px] hover:shadow-[2px_4px_0px_0px_rgba(0,0,0,1)] transition-all'
          >
            <ExternalLink className='h-4 w-4' />
          </a>
        )}
      </div>
      <h3 className='text-xl font-bold mb-1'>{publication.title}</h3>
      <h4 className='text-md font-medium mb-3 text-gray-700'>
        Published in {publication.publisher}
      </h4>
      <p className='text-gray-700'>{publication.description}</p>
    </div>
  )
}
