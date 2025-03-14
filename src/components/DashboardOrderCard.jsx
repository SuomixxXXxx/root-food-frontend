import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { completeOrder } from "../redux/slices/order";

export default function DashboardOrderCard({ orderNumber, items }) {
  const dispatch = useDispatch();

  const handleCompleteOrder = () => {
    dispatch(completeOrder(orderNumber));
  };

  return (
    <div className="card">
      <div className="flex flex-col justify-between h-full px-4 pt-4">
        <Typography
          variant="h4"
          color="blue-gray"
          className="mb-2 text-base md:text-xl items-center"
        >
          Заказ № {orderNumber}
        </Typography>

        <ul className="text-left h-40 overflow-y-auto">
          {items && items.length > 0 ? (
            items.map((item, index) => (
              <li
                key={index}
                className="flex justify-between text-sm border-b-2 py-1 md:text-base"
              >
                <span>{item.dishItemDTO.name}</span>
                <span className="mr-5">{item.quantity} </span>
              </li>
            ))
          ) : (
            <li className="text-gray-500">Нет товаров в заказе</li>
          )}
        </ul>
      </div>
      <div className="p-3">
        <Button
          className="flex justify-center items-center bg-base-blue hover:shadow-none shadow-none gap-2 w-full normal-case text-base mt-2"
          size="sm"
          onClick={handleCompleteOrder}
        >
          <span className="text-xs md:text-base">Готово</span>
        </Button>
      </div>
    </div>
  );
}
