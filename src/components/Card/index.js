import React from 'react'
import styles from './Card.module.scss'

const Card = ({ title, imageUrl, price }) => {
  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img src='/img/unliked.svg' alt='unliked' />
      </div>
      <img src={imageUrl} alt='Sneakers' width={133} height={112} />
      <h5>{title}</h5>
      <div className='d-flex justify-between align-center'>
        <div className='d-flex flex-column'>
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <button className='button'>
          <img src='/img/plus.svg' alt='Plus' width={11} height={11} />
        </button>
      </div>
    </div>
  )
}

export default Card
