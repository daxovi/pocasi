import React from 'react'

const Loading = () => {
  const reloadApp = () => { 
    window.location.reload()
   }

  return (
    <div className='no-content'>
      <img src="/icons/hourglass.svg" alt="načítání" />
      <p>načítání</p>
      <a href="" onClick={reloadApp}>znovu načíst aplikaci</a>
    </div>
  )
}

export default Loading