import React, { useContext } from 'react'
import { SortableItemContext } from '@/components/sortable'

export function ImageItem({
  item,
  addBorder,
  children,
}: {
  addBorder: boolean
  item: Setting.SwiperType
  children: React.ReactElement
}) {
  const { attributes, listeners, ref } = useContext(SortableItemContext)
  return (
    <div
      className={[
        'mr-3 w-[100px] h-[100px] relative z-50 shadow-sm hover:shadow-lg rounded-[12px] border-2 border-slate-50',
        addBorder ? ' border-green-600' : '',
      ].join(' ')}
      key={item.id}
      role="presentation"
    >
      {children}
      <img
        className="w-full h-full object-cover rounded-[12px]"
        src={item.src}
        {...attributes}
        {...listeners}
        ref={ref}
        alt=""
      />
    </div>
  )
}
