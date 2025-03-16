interface ScrollableSectionProps {
  children: React.ReactNode
}

export const ScrollableSection = ({ children }: ScrollableSectionProps) => {
  return (
    <div className='overflow-x-auto pb-4 -mx-4 px-4' style={{ overflowY: 'hidden' }}>
      <div className='flex gap-6 min-w-max'>{children}</div>
    </div>
  )
}
