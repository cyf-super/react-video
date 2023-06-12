import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import logo from '@/assets/logo.svg'

export const AppHeader = () => (
  <motion.nav className="sm:container sm:mx-auto after-border relative shadow-[0_11px_11px_-15px_#3b82f6]">
    <div className="flex-center max-w-screen-lg sm:max-w-screen-xl py-5">
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
  </motion.nav>
)
