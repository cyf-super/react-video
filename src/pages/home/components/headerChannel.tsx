import { FC, Dispatch, SetStateAction } from 'react'
import { Input, Select } from 'antd'
import { FiSearch } from 'react-icons/fi'
import { ProjectType } from './map'

const spanIcon = `hidden sm:block bg-blue-100 p-2.5 shadow-sm rounded-xl cursor-pointer`

const fiSearch = `text-ternary-dark dark:text-ternary-light w-4 h-4`

interface HeaderChannelType {
  searchName: string
  categary: string
  setSearchName: Dispatch<SetStateAction<string>>
  setCategary: Dispatch<SetStateAction<string>>
}

export const HeaderChannel: FC<HeaderChannelType> = ({
  searchName,
  categary,
  setSearchName,
  setCategary,
}) => {
  const handleChange = (
    _: string,
    option: typeof ProjectType | (typeof ProjectType)[number]
  ) => {
    console.log('🚀 ~ handleChange ~ value, option:', option)
    setCategary(_)
  }
  return (
    <div>
      <h3 className="text-center mt-8 text-md sm:text-xl">
        Search projects by title or filter by category
      </h3>

      <div className="flex justify-between my-8">
        <div className="flex-center gap-2">
          <Input
            placeholder="search"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="w-60 h-9 text-lg"
          />
          <span className={spanIcon}>
            <FiSearch className={fiSearch} />
          </span>
        </div>

        <Select
          defaultValue={categary}
          style={{ width: 180 }}
          onChange={handleChange}
          options={ProjectType}
        />
      </div>
    </div>
  )
}
