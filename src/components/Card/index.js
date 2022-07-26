import React from 'react'

import AppContext from '../../context'

import ContentLoader from 'react-content-loader'

import styles from './Card.module.scss'

const Card = ({
  title,
  imageUrl,
  price,
  id,
  onHeart,
  onPlus,
  favorited = false,
  loading = false,
}) => {
  const { isItemAdded } = React.useContext(AppContext)
  const [isFavorite, setIsFavorite] = React.useState(favorited)

  const onClickPlus = () => {
    onPlus({ title, imageUrl, price, id })
  }

  const onClickFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const onAddToFavorite = () => {
    onHeart({ title, imageUrl, price, id })
  }

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={250}
          viewBox='0 0 155 265'
          backgroundColor='#f3f3f3'
          foregroundColor='#ecebeb'
        >
          <rect x='1' y='0' rx='10' ry='10' width='155' height='155' />
          <rect x='0' y='167' rx='5' ry='5' width='155' height='15' />
          <rect x='0' y='187' rx='5' ry='5' width='100' height='15' />
          <rect x='1' y='234' rx='5' ry='5' width='80' height='25' />
          <rect x='124' y='230' rx='10' ry='10' width='32' height='32' />
        </ContentLoader>
      ) : (
        <>
          {' '}
          <div className={styles.favorite} onClick={onAddToFavorite}>
            {onHeart && (
              <img
                onClick={onClickFavorite}
                src={isFavorite ? `/img/liked.svg` : `/img/unliked.svg`}
                alt='favorite'
              />
            )}
          </div>
          <img src={imageUrl} alt='Sneakers' width='100%' height={135} />
          <h5>{title}</h5>
          <div className='d-flex justify-between align-center'>
            <div className='d-flex flex-column'>
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            {onPlus && (
              <img
                className={styles.plus}
                onClick={onClickPlus}
                src={
                  isItemAdded(id) ? '/img/btn-checked.svg' : '/img/btn-plus.svg'
                }
                alt='Plus'
              />
            )}
          </div>{' '}
        </>
      )}
    </div>
  )
}

export default Card
