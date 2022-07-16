import React from 'react'

import axios from 'axios'

import Card from './components/Card'
import Drawer from './components/Drawer'
import Header from './components/Header'

function App() {
  const [items, setItems] = React.useState([])
  const [isCartOpened, setIsCartOpened] = React.useState(false)

  React.useEffect(() => {
    axios
      .get('https://62d2b2bf81cb1ecafa643d83.mockapi.io/items')
      .then((data) => console.log(data))
  }, [])

  return (
    <div className='wrapper clear'>
      {isCartOpened && <Drawer onClose={() => setIsCartOpened(false)} />}

      <Header onCLickCart={() => setIsCartOpened(true)} />

      <div className='content p-40'>
        <div className='d-flex align-center justify-between mb-40'>
          <h1>Все кроссовки</h1>
          <div className='searchBlock'>
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M15.25 15.25L11.8855 11.8795L15.25 15.25ZM13.75 7.375C13.75 9.06576 13.0784 10.6873 11.8828 11.8828C10.6873 13.0784 9.06576 13.75 7.375 13.75C5.68424 13.75 4.06274 13.0784 2.86719 11.8828C1.67165 10.6873 1 9.06576 1 7.375C1 5.68424 1.67165 4.06274 2.86719 2.86719C4.06274 1.67165 5.68424 1 7.375 1C9.06576 1 10.6873 1.67165 11.8828 2.86719C13.0784 4.06274 13.75 5.68424 13.75 7.375V7.375Z'
                stroke='#E4E4E4'
                strokeWidth='2'
                strokeLinecap='round'
              />
            </svg>
            <input type='search' placeholder='Поиск...' />
          </div>
        </div>

        <div className='d-flex flex-wrap'>
          {items.map((item) => (
            <Card
              key={item.id}
              title={item.title}
              imageUrl={item.imageUrl}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
