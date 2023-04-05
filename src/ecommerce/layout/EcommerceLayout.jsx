import React from 'react'
import { Navbar } from '../../ui/components'
import { Footer } from '../../ui/components'

export const EcommerceLayout = ({ children }) => {
  return (
     
    <>
      <Navbar />
      <div className='h-24'>div body nav</div>
      {children}
      <Footer />
    </>

  )
}
