import React from 'react'

const Error = ({error}) => {
  const reloadApp = () => { 
    window.location.reload()
   }

  return (
    <div className='no-content'>
      <img src="/icons/ban.svg" alt="{error}" />
      <p>{error}</p>
      <a href="" onClick={reloadApp}>znovu načíst aplikaci</a>
    </div>
  )
}

export default Error