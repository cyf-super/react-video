import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface CardType {
  title: string
  category: string
  src: string
  timer: string
}

export const Card = ({ title, category, src, timer }: CardType) => (
  <motion.div>
    <Link to="/project:id">
      <img src={src} alt="" />
      <div>
        <p>{title}</p>
        <div>
          <span>{category}</span>
          <span>{timer}</span>
        </div>
      </div>
    </Link>
  </motion.div>
)
