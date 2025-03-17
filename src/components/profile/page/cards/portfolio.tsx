import Image from 'next/image'

interface PortfolioCardProps {
  portfolio: {
    title: string
    category: string
    description: string
    image?: string
    url?: string
  }
}

export const PortfolioCard = ({ portfolio }: PortfolioCardProps) => {
  return (
    <div className='w-[300px] bg-white border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-5px] hover:shadow-[5px_10px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-in-out'>
      <div className='h-[200px] border-b-[3px] border-black overflow-hidden relative group'>
        <Image
          src={portfolio.image || '/placeholder.svg?height=200&width=300'}
          alt={portfolio.title}
          className='w-full h-full object-cover'
        />
        <div className='absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out'>
          {portfolio.url && (
            <a
              href={portfolio.url}
              target='_blank'
              rel='noopener noreferrer'
              className='bg-[#fb5607] hover:bg-[#e04d06] text-black font-bold border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] px-4 py-2 rounded-md hover:translate-y-[-2px] hover:shadow-[2px_4px_0px_0px_rgba(0,0,0,1)] transition-all'
            >
              View Work
            </a>
          )}
        </div>
      </div>
      <div className='p-4'>
        <div className='bg-[#fb5607] text-black inline-block px-2 py-1 mb-2 font-bold border-[2px] border-black text-sm'>
          {portfolio.category}
        </div>
        <h3 className='text-xl font-bold mb-2'>{portfolio.title}</h3>
        <p className='text-gray-700'>{portfolio.description}</p>
      </div>
    </div>
  )
}
