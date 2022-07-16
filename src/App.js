import React from 'react'
import Card from './components/Card'
import Drawer from './components/Drawer'
import Header from './components/Header'

const items = [
  {
    id: 1,
    title: 'Мужские Кроссовки Nike Blazer Mid Suede',
    price: 12999,
    imageUrl: 'img/sneakers/1.jpg',
  },
  {
    id: 2,
    title: 'Мужские Кроссовки Nike Air Max 270',
    price: 15600,
    imageUrl: 'img/sneakers/2.jpg',
  },
  {
    id: 3,
    title: 'Мужские Кроссовки Nike Blazer Mid Suede',
    price: 8499,
    imageUrl: 'img/sneakers/3.jpg',
  },
  {
    id: 4,
    title: 'Кроссовки Puma X Aka Boku Future Rider',
    price: 8999,
    imageUrl: 'img/sneakers/4.jpg',
  },
  {
    id: '5',
    title: 'Кроссовки Future Rider',
    price: 16999,
    imageUrl: 'img/sneakers/5.jpg',
  },
  {
    id: '6',
    title: 'Кроссовки Black Edition',
    price: 16999,
    imageUrl: 'img/sneakers/6.jpg',
  },
  {
    id: '7',
    title: 'Кроссовки Orange Boomb Edition',
    price: 7499,
    imageUrl: 'img/sneakers/7.jpg',
  },
]

function App() {
  const [isCartOpened, setIsCartOpened] = React.useState(false)
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
                stroke-width='2'
                stroke-linecap='round'
              />
            </svg>
            <input type='search' placeholder='Поиск...' />
          </div>
        </div>

        <div className='d-flex'>
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
