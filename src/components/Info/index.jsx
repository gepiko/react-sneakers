import React from 'react'
import AppContext from '../../context'

const Info = ({ title, image, description }) => {
  const { setIsCartOpened } = React.useContext(AppContext)

  return (
    <div className='cartEmpty d-flex align-center justify-center flex-column flex'>
      <img src={image} alt='Empty Cart' className='mb-20' />
      <h2>{title}</h2>
      <p className='opacity-6'>{description}</p>
      <button onClick={() => setIsCartOpened(false)} className='greenButton'>
        <img src='/img/arrow.svg' alt='Arrow' />
        Вернуться назад
      </button>
    </div>
  )
}

export default Info
