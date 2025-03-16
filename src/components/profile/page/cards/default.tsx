interface DefaultCardProps {
  item: {
    id: string
    name: string
    description: string
  }
}

export const DefaultCard = ({ item }: DefaultCardProps) => {
  return (
    <div
      key={item.id}
      className='w-[250px] bg-white border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-4 hover:translate-y-[-5px] hover:shadow-[5px_10px_0px_0px_rgba(0,0,0,1)] transition-all'
    >
      <h3 className='text-lg font-bold'>{item.name}</h3>
      <p className='text-gray-700'>{item.description}</p>
    </div>
  )
}
