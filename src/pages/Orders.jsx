import React from 'react'

import axios from 'axios'

import Card from '../components/Card'
import AppContext from '../context'

const Orders = () => {
  const { onAddToFavorite, onAddToCart } = React.useContext(AppContext)
  const [orders, setOrders] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    try {
      async function fetchOrders() {
        const { data } = await axios.get(
          'https://62d2b2bf81cb1ecafa643d83.mockapi.io/orders',
        )
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
        setIsLoading(false)
      }
      fetchOrders()
    } catch (error) {
      alert('Ошибка при запросе заказов')
      console.log(error)
    }
  }, [])

  return (
    <div className='content p-40'>
      <div className='d-flex align-center flex-wrap justify-between mb-40'>
        <h1>Мои заказы</h1>
      </div>
      <div className='d-flex flex-wrap justify-between'>
        {(isLoading ? [...Array(7)] : orders).map((item) => (
          <Card key={item?.id} loading={isLoading} {...item} />
        ))}
      </div>
    </div>
  )
}

export default Orders
