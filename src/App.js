import React from 'react'

import { Routes, Route } from 'react-router-dom'

import axios from 'axios'

import AppContext from './context'

import Drawer from './components/Drawer'
import Header from './components/Header'
import Home from './pages/Home'
import Favorites from './pages/Favorites'

function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favorites, setFavorites] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [isCartOpened, setIsCartOpened] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchData() {
      const cartResponse = await axios.get(
        'https://62d2b2bf81cb1ecafa643d83.mockapi.io/cart',
      )

      const favoritesResponse = await axios.get(
        'https://62d2b2bf81cb1ecafa643d83.mockapi.io/favorites',
      )
      const itemsResponse = await axios.get(
        'https://62d2b2bf81cb1ecafa643d83.mockapi.io/items',
      )

      setIsLoading(false)

      setCartItems(cartResponse.data)
      setFavorites(favoritesResponse.data)
      setItems(itemsResponse.data)
    }

    fetchData()
  }, [])

  const onAddToCart = (obj) => {
    console.log(obj)
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(
          `https://62d2b2bf81cb1ecafa643d83.mockapi.io/cart/${obj.id}`,
        )
        setCartItems((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id)),
        )
      } else {
        axios.post('https://62d2b2bf81cb1ecafa643d83.mockapi.io/cart', obj)
        setCartItems((prev) => [...prev, obj])
      }
    } catch (error) {}
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://62d2b2bf81cb1ecafa643d83.mockapi.io/cart/${id}`)
    return setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(
          `https://62d2b2bf81cb1ecafa643d83.mockapi.io/favorites/${obj.id}`,
        )
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id))
      } else {
        const { data } = await axios.post(
          `https://62d2b2bf81cb1ecafa643d83.mockapi.io/favorites`,
          obj,
        )
        setFavorites((prev) => [...prev, data])
      }
    } catch (error) {
      alert('Не удалось добавить в избранное')
    }
  }

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value)
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id))
  }

  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded }}>
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
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path='/favorites'
            element={<Favorites onAddToFavorite={onAddToFavorite} />}
          />
        </Routes>
      </div>
    </AppContext.Provider>
  )
}

export default App
