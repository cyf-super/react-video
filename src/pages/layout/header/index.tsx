import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import logo from '@/assets/logo.svg'

export const AppHeader = () => (
  <motion.div className="relative h-full w-full overflow-hidden">
    <div className="flex-center h-full items-center backdrop-saturate-180">
      <div className="flex-center max-sm:w-full">
        <div className="logo">
          <Link to="/">
            <img className="w-12" src={logo} alt="" />
          </Link>
        </div>
        <div className="icon sm:hidden" />
      </div>

      <div className="hidden sm:flex">
        <Link to="/manage">管理</Link>
      </div>
    </div>
  </motion.div>
)
