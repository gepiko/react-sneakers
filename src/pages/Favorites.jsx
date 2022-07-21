import React from 'react'

import Card from '../components/Card'

const Favorites = ({ items, onAddToFavorite }) => {
  return (
    <div className='content p-40'>
      <div className='d-flex align-center flex-wrap justify-between mb-40'>
        <h1>Мои закладки</h1>
      </div>
      <div className='d-flex flex-wrap justify-between'>
        {items.map((item) => (
          <Card
            key={item.id}
            favorited={true}
            onHeart={onAddToFavorite}
            {...item}
          />
        ))}
      </div>
    </div>
  )
}

export default Favorites
