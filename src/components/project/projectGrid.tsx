import { HeaderChannel } from './headerChannel'
import { Card } from './projectItem'
import { cardInfo } from './map'

export const ProjectGrid = () => (
  <div className="mx-40">
    <HeaderChannel />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 sm:gap-10">
      {cardInfo &&
        cardInfo.map((card) => (
          <Card
            title={card.title}
            category={card.category}
            src={card.src}
            timer={card.timer}
            key={card.id}
          />
        ))}
    </div>
  </div>
)
