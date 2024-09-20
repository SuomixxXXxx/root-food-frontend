import React from 'react'
import OrderBox from '../components/OrderBox'

export default function CartPage() {
  return (
    <div className='flex h-screen'>
        <div className="flex flex-1 justify-center items-center bg-black">
            <OrderBox/>
        </div>
        <div className="flex-1 bg-blue-gray-400">

        </div>
    </div>
  )
}
