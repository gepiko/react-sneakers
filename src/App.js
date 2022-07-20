import React from 'react'

import { Routes, Route } from 'react-router-dom'

import axios from 'axios'

import Drawer from './components/Drawer'
import Header from './components/Header'
import Home from './pages/Home'

function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favorites, setFavorites] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [isCartOpened, setIsCartOpened] = React.useState(false)

  React.useEffect(() => {
    axios
      .get('https://62d2b2bf81cb1ecafa643d83.mockapi.io/items')
      .then((res) => setItems(res.data))
    axios
      .get('https://62d2b2bf81cb1ecafa643d83.mockapi.io/cart')
      .then((res) => setCartItems(res.data))
  }, [])

  const onAddToCart = (obj) => {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === obj.id,
    )

    if (existingCartItem) {
      return cartItems.map((cartItem) =>
        cartItem.id === obj.id ? { ...cartItem } : cartItems,
      )
    }
    axios.post('https://62d2b2bf81cb1ecafa643d83.mockapi.io/cart', obj)
    return setCartItems([...cartItems, obj])
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://62d2b2bf81cb1ecafa643d83.mockapi.io/cart/${id}`)
    return setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const onAddToFavorite = (obj) => {
    axios.post(`https://62d2b2bf81cb1ecafa643d83.mockapi.io/favorites`, obj)
    setFavorites((prev) => [...prev, obj])
  }

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value)
  }

  const Favorites = () => {
    return <div>Favorites</div>
  }

  return (
    <div className='wrapper clear'>
      {isCartOpened && (
        <Drawer
          items={cartItems}
          onClose={() => setIsCartOpened(false)}
          onRemove={onRemoveItem}
        />
      )}

      <Header onCLickCart={() => setIsCartOpened(true)} />

      <Routes>
        <Route
          path='/'
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
            />
          }
        />
        <Route path='/favorites' element={<Favorites />} />
      </Routes>
    </div>
  )
}

export default App
