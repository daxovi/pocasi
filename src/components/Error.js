import React from 'react'

// Komponenta Error zobrazuje chybu a možnost znovu načíst aplikaci
const Error = ({error}) => {
  // Funkce pro znovu načtení aplikace
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