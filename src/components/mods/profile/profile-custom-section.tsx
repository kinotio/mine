'use client'

import { Plus, Layers } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useProfile } from '@/components/mods/profile/profile-provider'

export const ProfileCustomSection = () => {
  const { profile, addCustomSection } = useProfile()

  return (
    <>
      {profile.customSections.map((section) => (
        <section key={section.id} className='mb-10'>
          <div className='flex justify-between items-center mb-6 mt-2 mr-6'>
            <h2 className='text-3xl font-black flex items-center'>
              <Layers className='mr-2' />
              {section.title}
            </h2>
            <Button
              onClick={() => {
                const updatedSections = profile.customSections.map((s) => {
                  if (s.id === section.id) {
                    return {
                      ...s,
                      items: [...s.items, { title: 'New Item', description: 'Description' }]
                    }
                  }
                  return s
                })
                addCustomSection(updatedSections)
              }}
              className='bg-[#ff6b6b] hover:bg-[#ff5252] text-black font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all'
            >
              <Plus className='mr-2 h-5 w-5' />
              {`Add ${section.title}`}
            </Button>
          </div>
          <div className='overflow-x-auto pb-4 -mx-4 px-4 pt-4' style={{ overflowY: 'hidden' }}>
            <div className='flex gap-6 min-w-max'>
              {section.items.length > 0 ? (
                section.items.map((item, index) => (
                  <div
                    key={index}
                    className='w-[250px] bg-white border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-4 hover:translate-y-[-5px] hover:shadow-[5px_10px_0px_0px_rgba(0,0,0,1)] transition-all'
                  >
                    <h3 className='text-lg font-bold'>{item.title}</h3>
                    <p className='text-gray-700'>{item.description}</p>
                  </div>
                ))
              ) : (
                <div className='w-full py-8 text-center'>
                  <p className='text-lg font-bold'>
                    {`${section.title} has no items yet. Click "Add Item" to get started.`}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      ))}
    </>
  )
}
