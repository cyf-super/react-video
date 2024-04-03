import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import logo from '@/assets/logo.svg'

export const AppHeader = () => (
  <motion.nav className="relative overflow-hidden shadow-md shadow-[#f1f1ff]">
    <div className="flex-center py-5 px-20 backdrop-saturate-180">
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
