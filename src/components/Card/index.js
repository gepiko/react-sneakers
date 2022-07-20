import React from 'react'
import styles from './Card.module.scss'

const Card = ({ title, imageUrl, price, id, onHeart, onPlus }) => {
  const [isAdded, setIsAdded] = React.useState(false)
  const [isFavorite, setIsFavorite] = React.useState(false)

  const onClickPlus = () => {
    onPlus({ title, imageUrl, price, id })
    setIsAdded(!isAdded)
  }

  const onClickFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const onAddToFavorite = () => {
    onHeart({ title, imageUrl, price, id })
  }

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onAddToFavorite}>
        <img
          onClick={onClickFavorite}
          src={isFavorite ? `/img/liked.svg` : `/img/unliked.svg`}
          alt='favorite'
        />
      </div>
      <img src={imageUrl} alt='Sneakers' width={133} height={112} />
      <h5>{title}</h5>
      <div className='d-flex justify-between align-center'>
        <div className='d-flex flex-column'>
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <img
          className={styles.plus}
          onClick={onClickPlus}
          src={isAdded ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
          alt='Plus'
        />
      </div>
    </div>
  )
}

export default Card
