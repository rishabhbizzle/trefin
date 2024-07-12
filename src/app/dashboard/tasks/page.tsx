import React from 'react'
import dynamic from 'next/dynamic';
import ClientOnly from '@/components/ClientOnly';

const KanbanBoard = dynamic(() => import('./components/KanbanBoard'), { ssr: false });

const Page = () => {
  return (
    <div className=''>

      <KanbanBoard />
      </div>
  )
}

export default Page