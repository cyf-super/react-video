/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Dropdown, MenuProps } from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  LaptopOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { useParams } from 'react-router-dom'
import { memo, useContext, useRef } from 'react'
import { useCategory } from '../../hooks/useCategory'
import styles from '../../css/index.module.scss'
import { CategoryModal, DeleteModal } from '../modals'
import {
  SortSwiperItem,
  SortableItemContext,
  SortableList,
} from '@/components/sortable'

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

  const { attributes, listeners, ref } = useContext(SortableItemContext)

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
    <div
      className="relative flex justify-between items-center h-[35px] w-full p-5 rounded-lg hover:bg-slate-200  hover:cursor-pointer"
      style={
        categoryId === item.categoryId
          ? {
              backgroundColor: '#1667cb',
              color: '#fff',
            }
          : {}
      }
      {...attributes}
      onClick={() => clickMenuItem(item.categoryId)}
    >
      <div className="flex items-center">
        <LaptopOutlined ref={ref} {...listeners} />
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
  )
}

export const CategorySider = memo(() => {
  const nameRef = useRef('')

  const {
    idRef,
    showDeleteModal,
    showInputModal,
    categoryList,
    isSetting,
    onChangeCateory,
    navigate,
    setShowInputModal,
    setShowDeleteModal,
    createCategoryFunc,
    handleDelete,
    clickMenuItem,
  } = useCategory()

  const onSetting = () => {
    navigate('/manage/setting')
  }

  const onHandleFile = (event: any, key: string, id: string) => {
    event.stopPropagation()
    idRef.current = id
    if (key === 'edit') {
      setShowInputModal(true)
      const name =
        categoryList?.find((item) => item.categoryId === id)?.name || ''
      nameRef.current = name
    } else {
      setShowDeleteModal(true)
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
          <SortableList
            items={categoryList}
            onChange={onChangeCateory}
            renderItem={(item) => (
              <SortSwiperItem id={item.categoryId} key={item.categoryId}>
                <Item
                  item={item}
                  clickMenuItem={clickMenuItem}
                  onHandleFile={onHandleFile}
                />
              </SortSwiperItem>
            )}
          />
          {/* <DndContext
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
          </DndContext> */}
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
