import { memo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import logo from '@/assets/logo.svg'
import { getWebsiteApi } from '@/api'
import { userInfoStore } from '@/store/userInfoStore'

export const AppHeader = memo(() => {
  const { setWebsite } = userInfoStore()

  const { data: res } = useQuery({
    queryFn: getWebsiteApi,
    queryKey: ['websiteInfo'],
    onSuccess(response) {
      setWebsite(response.data)
    },
  })

  return (
    <motion.div className="relative h-full w-full overflow-hidden">
      <div className="flex-center h-full items-center backdrop-saturate-180">
        <div className="flex-center max-sm:w-full">
          <div className="logo">
            <Link to="/">
              <img className="w-12" src={res?.data.logo || logo} alt="" />
            </Link>
          </div>
          <div className="icon sm:hidden" />
        </div>

        <div className="hidden sm:flex">
          <Link to="/manage" className="px-4 py-2 bg-blue-600 rounded-full">
            管理
          </Link>
        </div>
      </div>
    </motion.div>
  )
})
