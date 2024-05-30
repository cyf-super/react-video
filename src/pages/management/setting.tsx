/* eslint-disable @typescript-eslint/no-use-before-define */
import { Button, Input, Tabs } from 'antd'
import { DeleteOutlined, PlusSquareOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import { ChangeEvent, useState } from 'react'
import { SwiperComponent } from '@/components/swiper'
import { SortSwiperItem, SortableList } from '@/components/sortable'
import { ImageItem } from './components/sortSwiperImage'
import { defaultImageNums, useHomeStting } from './hooks/useSetting'
import { useInfoSetting } from './hooks/useInfoSetting'

export type TabType = 'swiper' | 'userInfo'

const TabOptions = [
  {
    id: 'swiper',
    label: '首页',
    children: HomeSetting,
  },
  {
    id: 'userInfo',
    label: '个人信息',
    children: InfoSetting,
  },
]

export default function Setting() {
  const [tabStatus, setTabStatus] = useState('swiper')
  const onChangeTag = (key: string) => {
    console.log(key)
    setTabStatus(key)
  }
  return (
    <div className="m-5">
      <Tabs
        onChange={onChangeTag}
        type="card"
        items={TabOptions.map((item) => ({
          label: item.label,
          key: item.id,
          children: <item.children tabStatus={tabStatus} />,
        }))}
      />
    </div>
  )
}

interface Props {
  tabStatus?: string
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
    <div>
      <h1 className="my-2 text-xl border-indigo-400">轮播图设置</h1>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: 'easeInOut', duration: 0.9, delay: 0.1 }}
      >
        {list.length ? (
          <SwiperComponent list={list} />
        ) : (
          <div className="w-9/12 h-auto aspect-video text-xl">无轮播图</div>
        )}

        {/* 预览模块 */}
        <div className="flex mt-3 flex-shrink-0 flex-nowrap">
          <SortableList
            classnames="flex"
            items={list}
            onChange={setList}
            renderItem={(item) => (
              <SortSwiperItem id={item.id} key={item.id}>
                <ImageItem
                  item={item}
                  addBorder={!!(itemImage && itemImage.id === item.id)}
                >
                  <>
                    <PlusSquareOutlined
                      className="absolute top-2 left-2 scale-125"
                      onClick={(e) => {
                        e.stopPropagation()
                        onClickImage(item.id)
                      }}
                    />
                    <DeleteOutlined
                      className="absolute top-2 right-2 scale-125"
                      onClick={(e) => {
                        e.stopPropagation()
                        onDeleteImage(item.id)
                      }}
                    />
                  </>
                </ImageItem>
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

        <div className="h-40">
          {itemImage ? (
            <>
              <Input
                placeholder="设置跳转链接"
                className="mt-6 w-80"
                value={itemImage.href}
                onChange={(e) =>
                  setItemImage({
                    ...itemImage,
                    href: e.target.value,
                  })
                }
              />
              <div className="my-4">
                <Button className="mr-3" onClick={() => setItemImage(null)}>
                  取消
                </Button>
                <Button className="green-success" onClick={onSaveImageHref}>
                  确定
                </Button>
              </div>
            </>
          ) : null}
        </div>
        <hr />
      </motion.section>

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

function InfoSetting({ tabStatus }: Props) {
  const {
    userInfo,
    website,
    onCancleUser,
    onSureUser,
    onSetUserInfo,
    onAvatarChange,
    onLogoChange,
  } = useInfoSetting(tabStatus)

  return (
    <div>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: 'easeInOut', duration: 0.9, delay: 0.1 }}
      >
        <h1 className="text-xl">用户信息</h1>
        <div className="mt-2 text-base">
          <span className="mr-2">名称:</span>
          <span>{userInfo.username}</span>
        </div>
        <div className="mt-2 text-base">
          <span>昵称</span>
          <Input
            value={userInfo.nickname}
            onChange={(e) =>
              onSetUserInfo({
                nickname: e.target.value.trim(),
              })
            }
            className="w-[200px] ml-2"
          />
        </div>
        <div className="flex mt-2 text-base">
          <span>新密码</span>
          <Input
            value={userInfo.password}
            onChange={(e) =>
              onSetUserInfo({
                password: e.target.value.trim(),
              })
            }
            className="w-[200px] ml-2"
          />
        </div>
        <div className="flex mt-2 text-base">
          <span>确认密码</span>
          <Input
            value={userInfo.verifyPassword}
            onChange={(e) =>
              onSetUserInfo({
                verifyPassword: e.target.value.trim(),
              })
            }
            className="w-[200px] ml-2"
          />
        </div>
        <div className="mt-2 text-base">
          头像
          <UploadImage
            src={userInfo.picture}
            onImageChange={onAvatarChange}
            classname="rounded-full"
          />
        </div>

        <div className="mt-3">
          <Button onClick={onCancleUser}>取消</Button>
          <Button type="primary" onClick={onSureUser}>
            确定
          </Button>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: 'easeInOut', duration: 0.9, delay: 0.1 }}
        className="mt-2"
      >
        <div className="text-xl mt-8">网站信息</div>
        <div className="mt-2 text-base">
          <span>首页名称</span>
          <Input value={website.name} className="w-[200px] ml-2" />
        </div>

        <div className="mt-2 text-base">
          <div>logo</div>
          <UploadImage src={website.image} onImageChange={onLogoChange} />
        </div>
      </motion.section>
    </div>
  )
}

function UploadImage({
  onImageChange,
  src,
  classname,
}: {
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void
  src: string
  classname?: string
}) {
  return (
    <div
      className={[
        'relative flex justify-center items-center w-[100px] h-[100px] text-[50px] text-indigo-500 leading-[95px] text-center border-solid border-[1.5px] rounded-2xl border-indigo-400',
        classname,
      ].join(' ')}
    >
      <input
        type="file"
        accept="image/*"
        multiple
        className="w-full h-full absolute top-0 left-0 opacity-0"
        onChange={onImageChange}
      />
      {src ? (
        <img
          src={src}
          alt=""
          className={['object-cover w-full rounded-2xl', classname].join(' ')}
        />
      ) : (
        '+'
      )}
    </div>
  )
}
