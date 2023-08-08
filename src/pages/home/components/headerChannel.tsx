import { Input, Select } from 'antd'
import { FiSearch } from 'react-icons/fi'
import { ProjectType } from './map'

function SearchInput() {
  return (
    <div className="flex-center gap-2">
      <Input placeholder="Search" value={13} className="w-60 h-9 text-lg" />
      <span className="hidden sm:block bg-blue-100 p-2.5 shadow-sm rounded-xl cursor-pointer">
        <FiSearch className="text-ternary-dark dark:text-ternary-light w-4 h-4" />
      </span>
    </div>
  )
}

const Filter = () => {
  const handleChange = () => {}
  return (
    <Select
      defaultValue="all"
      style={{ width: 180 }}
      onChange={handleChange}
      options={ProjectType}
    />
  )
}

export const HeaderChannel = () => (
  <div>
    <h3 className="text-center mt-8 text-md sm:text-xl">
      Search projects by title or filter by category
    </h3>
    <div className="flex justify-between my-8">
      <SearchInput />
      <Filter />
    </div>
  </div>
)
