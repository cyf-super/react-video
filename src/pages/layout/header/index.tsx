import { memo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import logo from '@/assets/logo.svg'
import { getWebsiteApi } from '@/api'
import { UserState, userInfoStore } from '@/store/userInfoStore'

export const AppHeader = memo(() => {
  const { setWebsite } = userInfoStore()
  const navigate = useNavigate()

  const { data: res } = useQuery({
    queryFn: getWebsiteApi,
    queryKey: ['websiteInfo'],
    onSuccess(response) {
      setWebsite(response.data)
    },
  })

  const { userInfo } = userInfoStore()
  const { role } = userInfo

  const onManage = () => {
    console.log('role ', role)
    if (role === UserState.admin) {
      navigate('/manage')
    }
  }

  return (
    <header className="max-w-screen-xl mx-auto mb-8">
      <nav className="px-4 sm:px-5 py-12 flex items-center justify-between space-x-12">
        <div className="flex items-center space-x-8">
          <div id="logo" className="flex items-center space-x-2">
            <img
              src={res?.data.logo || logo}
              className="w-16 h-16"
              alt="Trippi Logo"
            />
            <h5 className="text-xl font-bold text-[#094067]">Trippi</h5>
          </div>
          <div className="hidden px-5 py-3 w-[550px] border-2 border-[#094067] rounded-md lg:flex space-x-2 focus-within:ring-2 focus-within:ring-[#3DA9FC] ring-offset-2 transition duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-search"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="10" cy="10" r="7" />
              <line x1="21" y1="21" x2="15" y2="15" />
            </svg>
            <input
              className="w-full border-none outline-none focus:outline-none"
              type="text"
              placeholder="Cari tempat liburan, hotel, tiket pesawat, dll"
            />
          </div>
        </div>
        <div className="lg:hidden">
          <button onClick={() => {}} type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex items-center space-x-5">
          <button
            type="button"
            className="px-5 py-3 text-white bg-[#3DA9FC] rounded-md shadow-[0_6px_30px_rgba(61,169,252,0.6)] font-semibold hover:bg-[#3498E4] transition-colors duration-300"
            onClick={onManage}
          >
            {role === UserState.none ? 'Login' : 'Manage'}
          </button>
          {/* <Button className="px-5 py-3 flex items-center space-x-1 font-semibold text-[#094067] hover:text-[#094067]/75 transition duration-300">
              <span>ID</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </Button> */}
        </div>
      </nav>
    </header>
  )
})
