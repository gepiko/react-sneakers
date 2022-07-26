import React from 'react'

import AppContext from '../context'

import Card from '../components/Card'

const Favorites = () => {
  const { favorites, onAddToFavorite, onAddToCart } =
    React.useContext(AppContext)

  return (
    <div className='content p-40'>
      <div className='d-flex align-center flex-wrap justify-between mb-40'>
        <h1>Мои закладки</h1>
      </div>
      <div className='d-flex flex-wrap justify-between'>
        {favorites.map((item) => (
          <Card
            key={item?.id}
            favorited={true}
            onHeart={onAddToFavorite}
            onPlus={(obj) => onAddToCart(obj)}
            {...item}
          />
        ))}
      </div>
    </div>
  )
}

export default Favorites
