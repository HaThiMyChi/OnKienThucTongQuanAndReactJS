import CartHeader from '../../components/CartHeader'
import Footer from '../../components/Footer'

interface Props {
  children?: React.ReactNode
}

import React from 'react'

export default function CartLayout({ children }: Props) {
  return (
    <div>
      <div>
        <CartHeader />
        {children}
        <Footer />
      </div>
    </div>
  )
}
