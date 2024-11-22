import { Button } from "@material-tailwind/react";
import OrderBox from "../components/OrderBox";
import PaymentBox from "../components/PaymentBox";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function CartPage() {
  const { amount } = useSelector((state) => state.cart);

  if (amount === 0) {
    return (
      <div className="flex flex-col items-center h-screen bg-light-blue">
        <div className="flex flex-col items-center mt-20 md:mt-28">
          <p className="text-xl md:text-2xl text-black font-bold mb-3">
            Корзина ждет пока её наполнят...
          </p>
          <Link to="/category">
            <Button className="w-fit normal-case md:text-lg bg-base-blue shadow-light-blue shadow-sm hover:shadow-light-blue rounded-2xl justify-center items-center">
              В каталог
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-col md:flex md:flex-row-reverse lg:flex-row md:min-h-screen pb-6 md:pb-0 pt-5 bg-light-blue">
      <div className="flex mt-20 md:mt-28 md:flex-1 justify-center md:order-2">
        <OrderBox />
      </div>
      <div className="flex flex-1 md:mt-28 pl-16 md:order-1">
        <PaymentBox />
      </div>
    </div>
  );
}
