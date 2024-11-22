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
    <div className='flex-col md:flex md:flex-row-reverse lg:flex-row md:min-h-screen min-h-full pb-10 md:pb-0 pt-5 bg-light-blue'>
        <div className="flex pt-5 md:flex-1 justify-center items-center md:order-2">
            <OrderBox/>
        </div>
        <div className="flex flex-1 mt-48 pl-16 md:order-1">
            <PaymentBox/>
        </div>
    </div>
  )
}