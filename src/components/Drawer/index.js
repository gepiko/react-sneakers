import React from 'react'
import axios from 'axios'

import AppContext from '../../context'

import Info from '../Info'

import styles from './Drawer.module.scss'

// Delay is for deleting items from mockapi, so that it won't ban me
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const Drawer = ({ onClose, onRemove, items = [] }) => {
  const { cartItems, setCartItems } = React.useContext(AppContext)

  const [orderId, setOrderId] = React.useState(null)
  const [isOrderComplete, setIsOrderComplete] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const onClickOrder = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.post(
        'https://62d2b2bf81cb1ecafa643d83.mockapi.io/orders',
        { items: cartItems },
      )
      setOrderId(data.id)
      setIsOrderComplete(true)
      setCartItems([])

      // I need to delete items after I order something
      // But mockapi don't have replace
      // So I can't just do this: await axios.put('/cart', [])
      // That's why I have this crutch ...
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i]
        await axios.delete(
          'https://62d2b2bf81cb1ecafa643d83.mockapi.io/cart/' + item.id,
        )
        await delay(1000)
      }
    } catch (error) {
      alert('Ошибка при создании заказа ...')
      console.log(error)
    }
    setIsLoading(false)
  }

  return (
    <div className='overlay'>
      <div className={styles.drawer}>
        <h2 className='d-flex justify-between mb-30'>
          Корзина{' '}
          <img
            onClick={onClose}
            className='cu-p'
            src='/img/btn-remove.svg'
            alt='Remove'
          />
        </h2>

        {items.length > 0 ? (
          <>
            <div className={styles.items}>
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className='cartItem d-flex align-center mb-20'
                >
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className='cartItemImg'
                  ></div>
                  <div className='mr-20 flex'>
                    <p className='mb-5'>{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className='removeBtn'
                    src='/img/btn-remove.svg'
                    alt='Remove'
                  />
                </div>
              ))}
            </div>
            <div className='cartTotalBlock'>
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>21 498 руб.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>1074 руб.</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className='greenButton'
              >
                Оформить заказ <img src='/img/arrow.svg' alt='Arrow' />
              </button>
            </div>
          </>
        ) : (
          <Info
            title={isOrderComplete ? 'Заказ оформлен' : 'Корзина пустая'}
            image={
              isOrderComplete
                ? '/img/complete-order.jpg'
                : '/img/empty-cart.jpg'
            }
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке!`
                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
            }
          />
        )}
      </div>
    </div>
  )
}

export default Drawer
