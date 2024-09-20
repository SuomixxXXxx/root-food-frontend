import React from 'react'
import OrderBox from '../components/OrderBox'
import PaymentBox from '../components/PaymentBox'

export default function CartPage() {
  return (
    <div className='flex h-screen bg-blue-gray-100'>
        <div className="flex flex-1 justify-center items-center">
            <OrderBox/>
        </div>
        <div className="flex flex-1 justify-center items-center">
            <PaymentBox/>
        </div>
    </div>
  )
}
