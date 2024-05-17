import React, {
  CSSProperties,
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
} from 'react'
import { DeleteOutlined } from '@ant-design/icons'
import { useSortable } from '@dnd-kit/sortable'
import type { UniqueIdentifier } from '@dnd-kit/core'
import { DraggableSyntheticListeners } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

interface Props {
  id: UniqueIdentifier
}

interface Context {
  attributes: Record<string, any>
  listeners: DraggableSyntheticListeners
  ref(node: HTMLElement | null): void
}

const SortableItemContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() {},
})

export function SortSwiperItem({ children, id }: PropsWithChildren<Props>) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id })
  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef]
  )
  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  }

  return (
    <SortableItemContext.Provider value={context}>
      <li ref={setNodeRef} style={style}>
        {children}
      </li>
    </SortableItemContext.Provider>
  )
}

export function ImageItem({
  item,
  onDelete,
  onClickItem,
}: {
  item: Setting.SwiperType
  onDelete: (id: string) => void
  onClickItem: (id: string) => void
}) {
  const { attributes, listeners, ref } = useContext(SortableItemContext)

  console.log('listeners', listeners)

  return (
    <div
      className="mr-3 w-[100px] h-[100px] relative z-50"
      key={item.id}
      role="presentation"
    >
      <DeleteOutlined
        className="absolute top-1 right-2 scale-125"
        onClick={(e) => {
          e.stopPropagation()
          onDelete(item.id)
        }}
      />
      <img
        className="w-full h-full object-cover"
        src={item.src}
        {...attributes}
        {...listeners}
        ref={ref}
        alt=""
      />
    </div>
  )
}
