import React, { useMemo, useState } from 'react'
import type { PropsWithChildren, ReactNode } from 'react'
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core'
import type { Active, UniqueIdentifier, DropAnimation } from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'

interface BaseItem {
  id: UniqueIdentifier
}

interface ListProps<T extends BaseItem> {
  items: T[]
  classnames?: string
  onChange(items: T[]): void
  renderItem(item: T): ReactNode
}

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.4',
      },
    },
  }),
}

interface Props {}
export function SortableOverlay({ children }: PropsWithChildren<Props>) {
  return (
    <DragOverlay dropAnimation={dropAnimationConfig}>{children}</DragOverlay>
  )
}

export function SortableList<T extends BaseItem>({
  items,
  onChange,
  renderItem,
  classnames,
}: ListProps<T>) {
  const [active, setActive] = useState<Active | null>(null)
  const activeItem = useMemo(
    () => items.find((item) => item.id === active?.id),
    [active, items]
  )
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active: activeStart }) => {
        setActive(activeStart)
      }}
      onDragEnd={({ active: activeEnd, over }) => {
        if (over && activeEnd.id !== over?.id) {
          const activeIndex = items.findIndex(({ id }) => id === activeEnd.id)
          const overIndex = items.findIndex(({ id }) => id === over.id)
          onChange(arrayMove(items, activeIndex, overIndex))
        }
        setActive(null)
      }}
      onDragCancel={() => {
        setActive(null)
      }}
    >
      <SortableContext items={items}>
        <ul className={classnames} role="application">
          {items.map((item) => (
            <React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>
          ))}
        </ul>
      </SortableContext>
      <SortableOverlay>
        {activeItem ? renderItem(activeItem) : null}
      </SortableOverlay>
    </DndContext>
  )
}
