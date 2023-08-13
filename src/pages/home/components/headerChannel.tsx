import { FC, Dispatch, SetStateAction, useState, useEffect } from 'react'
import { Input, Select } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import { useSelect, CategoryOptions } from '../hooks/useProject'
import { typeGuard } from '@/utils/type'

const spanIcon = `hidden sm:block bg-blue-100 p-2.5 shadow-sm rounded-xl cursor-pointer`

const fiSearch = `text-ternary-dark dark:text-ternary-light w-4 h-4`

interface HeaderChannelType {
  searchName: string
  setSearchName: Dispatch<SetStateAction<string>>
}

export const HeaderChannel: FC<HeaderChannelType> = ({
  searchName,
  setSearchName,
}) => {
  const navigate = useNavigate()
  const { categoryId } = useParams()
  const [selectValue, setSelectValue] = useState('全部')

  const { categores } = useSelect()

  const handleChange = (
    _: string,
    option: CategoryOptions | CategoryOptions[]
  ) => {
    const category = typeGuard<CategoryOptions>(option as CategoryOptions)
    navigate(`/home/${category.id}`)
  }

  useEffect(() => {
    if (categoryId) {
      const category = categores.find((item) => item.id === categoryId)
      category && setSelectValue(category.label)
    }
  }, [categores, categoryId])

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
          value={selectValue}
          style={{ width: 180 }}
          onChange={handleChange}
          options={categores}
        />
      </div>
    </div>
  )
}
