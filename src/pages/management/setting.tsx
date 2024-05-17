/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react'
import { Button, Input, Tabs } from 'antd'
import { SwiperComponent } from '@/components/swiper'
import { SortableList } from '@/components/sortable'
import { SortSwiperItem, ImageItem } from './components/sortSwiperImage'
import { defaultImageNums, useHomeStting } from './hooks/useSetting'

const onChangeTag = (key: string) => {
  console.log(key)
}

const TabOptions = [
  {
    id: '1',
    label: '首页',
    children: HomeSetting,
  },
  {
    id: '2',
    label: '个人信息',
    children: Person,
  },
]

export default function Setting() {
  return (
    <div className="m-5">
      <Tabs
        onChange={onChangeTag}
        type="card"
        items={TabOptions.map((item) => ({
          label: item.label,
          key: item.id,
          children: <item.children />,
        }))}
      />
    </div>
  )
}

function HomeSetting() {
  const {
    itemImage,
    list,
    status,
    setList,
    setItemImage,
    onFileChange,
    onSave,
    onDeleteImage,
    onClickImage,
    onSaveImageHref,
  } = useHomeStting()

  return (
    <div className="">
      <h1 className="my-2 text-xl border-indigo-400">轮播图设置</h1>
      <section>
        {list.length ? (
          <SwiperComponent list={list} />
        ) : (
          <div className="w-9/12 h-auto aspect-video text-xl">无轮播图</div>
        )}

        {/* 预览模块 */}
        <div className="flex mt-3">
          <SortableList
            classnames="flex"
            items={list}
            onChange={setList}
            renderItem={(item) => (
              <SortSwiperItem id={item.id} key={item.id}>
                <ImageItem
                  item={item}
                  onDelete={onDeleteImage}
                  onClickItem={onClickImage}
                />
              </SortSwiperItem>
            )}
          />

          {list.length < defaultImageNums && (
            <div className="relative w-[100px] h-[100px] text-[50px] text-indigo-500 leading-[95px] text-center border-solid border-[1.5px] rounded-2xl border-indigo-400">
              <input
                type="file"
                accept="image/*"
                multiple
                className="w-full h-full absolute top-0 left-0 opacity-0"
                onChange={onFileChange}
              />
              +
            </div>
          )}
        </div>

        <div className="h-20">
          {itemImage ? (
            <>
              <Input
                value={itemImage.href}
                onChange={(e) =>
                  setItemImage({
                    ...itemImage,
                    href: e.target.value,
                  })
                }
              />
              <div className="mt-2">
                <Button className="mr-2" onClick={() => setItemImage(null)}>
                  取消
                </Button>
                <Button type="primary" onClick={onSaveImageHref}>
                  确定
                </Button>
              </div>
            </>
          ) : null}
        </div>
      </section>

      <div className="mt-5">
        <Button className="mr-2">取消</Button>
        <Button
          type="primary"
          loading={status === 'loading'}
          disabled={status === 'default'}
          onClick={onSave}
        >
          保存
        </Button>
      </div>
    </div>
  )
}

function Person() {
  return <div>Person</div>
}
