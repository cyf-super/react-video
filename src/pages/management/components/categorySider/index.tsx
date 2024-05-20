/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Dropdown, MenuProps } from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  LaptopOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import clsx from 'clsx'
import { useParams } from 'react-router-dom'
import { memo, useRef } from 'react'
import {
  DndContext,
  useSensors,
  TouchSensor,
  useSensor,
  MouseSensor,
  closestCenter,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useCategory } from '../../hooks/useCategory'
import styles from '../../css/index.module.scss'
import { CategoryModal, DeleteModal } from '../modals'

interface CategorySiderPropsType {
  data: Category.Data[]
}

function Item({
  item,
  clickMenuItem,
  onHandleFile,
}: {
  item: Category.Data
  clickMenuItem: (id: string) => void
  onHandleFile: (event: any, key: string, categoryId: string) => void
}) {
  const { categoryId } = useParams()

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.categoryId })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  console.log('style ', style, attributes, listeners)

  const items: MenuProps['items'] = [
    {
      key: 'edit',
      label: (
        <div className="w-20 flex-center justify-start">
          <EditOutlined />
          <span>编辑</span>
        </div>
      ),
    },
    {
      key: 'delete',
      label: (
        <div className="w-20 flex-center justify-start">
          <DeleteOutlined />
          <span className="text-red-600 m-1">删除</span>
        </div>
      ),
    },
  ]

  return (
    <div className="">
      <div
        ref={setNodeRef}
        className={clsx(
          'relative flex justify-between items-center h-[35px] w-full p-5 rounded-lg hover:bg-slate-200  hover:cursor-pointer'
        )}
        style={
          categoryId === item.categoryId
            ? {
                backgroundColor: '#1667cb',
                color: '#fff',
                ...style,
              }
            : style
        }
        onClick={() => clickMenuItem(item.categoryId)}
      >
        <div className="flex items-center" {...attributes} {...listeners}>
          <LaptopOutlined />
          <span className="ml-[6px]">{item.name}</span>
        </div>
        <Dropdown
          menu={{
            items,
            onClick: ({ key, domEvent }) =>
              onHandleFile(domEvent, key, item.categoryId),
            style: {
              width: '80px',
            },
          }}
          placement="bottom"
          arrow={{ pointAtCenter: true }}
        >
          <span className="hidden">...</span>
        </Dropdown>
      </div>
    </div>
  )
}

export const CategorySider = memo(({ data }: CategorySiderPropsType) => {
  const nameRef = useRef('')
  const { categoryId } = useParams()

  const {
    idRef,
    showDeleteModal,
    showInputModal,
    navigate,
    setShowInputModal,
    setShowDeleteModal,
    createCategoryFunc,
    handleDelete,
    clickMenuItem,
  } = useCategory()

  const isSetting = categoryId === 'setting'
  const onSetting = () => {
    navigate('/manage/setting')
  }

  const onHandleFile = (event: any, key: string, id: string) => {
    event.stopPropagation()
    idRef.current = id
    if (key === 'edit') {
      setShowInputModal(true)
      const name = data?.find((item) => item.categoryId === id)?.name || ''
      nameRef.current = name
    } else {
      setShowDeleteModal(true)
    }
  }

  const sensors = useSensors(
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(MouseSensor)
  )

  const handleDragEnd = (event: { active: any; over: any; delta: any }) => {
    const { active, over, delta } = event
    console.log('active, over, delta ', active, over, delta)
    if (active.id !== over.id) {
      // console.log(id)
    } else if (Math.abs(delta.x) > over.rect.width) {
      console.log(12)
    }
  }

  return (
    <>
      <div
        className={[
          styles.siderItem,
          'flex flex-col justify-between h-full pb-2',
        ].join(' ')}
      >
        <div>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            {data && (
              <SortableContext
                items={data}
                strategy={verticalListSortingStrategy}
              >
                {data.map((item) => (
                  <Item
                    key={item.categoryId}
                    item={item}
                    clickMenuItem={clickMenuItem}
                    onHandleFile={onHandleFile}
                  />
                ))}
              </SortableContext>
            )}
          </DndContext>
        </div>
        <div className="mb-5">
          <div
            className={[
              'w-full px-4 py-2 flex items-center cursor-pointer text-indigo-500 border-solid border-2',
              isSetting
                ? 'border-solid border-[1.5px] rounded-md border-indigo-400'
                : '',
            ].join(' ')}
            onClick={onSetting}
          >
            <SettingOutlined />
            <div className="ml-1">设置</div>
          </div>
        </div>
      </div>
      <DeleteModal
        open={showDeleteModal}
        text="确定删除该分类？"
        handleOk={handleDelete}
        handleCancel={() => setShowDeleteModal(false)}
      />
      <CategoryModal
        open={showInputModal}
        title="编辑"
        value={nameRef.current}
        handleOk={createCategoryFunc}
        handleCancel={() => setShowInputModal(false)}
      />
    </>
  )
})
