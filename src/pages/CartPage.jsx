import OrderBox from '../components/OrderBox'
import PaymentBox from '../components/PaymentBox'
import { useSelector } from 'react-redux';
export default function CartPage() {
  const { amount } = useSelector((state) => state.cart);

  if (amount===0) {
    return (
      <div className="flex justify-center items-center h-screen bg-blue-gray-100">
        <p className="text-3xl text-black font-bold">Ваша корзина пуста 🐺</p>
      </div>
    )
  }

  return (
    <div className='flex-col md:flex lg:flex-row min-h-screen pb-6 pt-5 bg-blue-gray-100'>
        <div className="flex pt-5 md: flex-1 justify-center items-center">
            <OrderBox/>
        </div>
        <div className="flex pt-5 flex-1 justify-center items-center">
            <PaymentBox/>
        </div>
    </div>
  )
}