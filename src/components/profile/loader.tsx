export const ProfileLoader = () => {
  return (
    <div className='min-h-screen bg-[#f0f0f0] p-6 md:p-10'>
      <div className='fixed bottom-8 right-8 z-50'>
        <div className='bg-white border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-4 flex items-center'>
          <div className='relative w-6 h-6 mr-3'>
            <div className='absolute inset-0 border-[3px] border-t-transparent border-black rounded-full animate-spin'></div>
          </div>
          <div className='font-bold'>Loading Profile...</div>
        </div>
      </div>
    </div>
  )
}
