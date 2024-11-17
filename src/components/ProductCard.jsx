import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  IconButton,
  Button,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/slices/cart";

export default function ProductCard({ id, name, weight, price }) {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  const existingItem = items.find((item) => item.id === id);
  const quantity = existingItem ? existingItem.quantity : 0;

  return (
    <div className="ml-0 md:ml-4">
      <Card className="flex h-auto w-40 md:h-96 md:w-80 bg-[#ffffff]">
        <div className="flex justify-center items-center">
          <CardHeader
            floated={false}
            className="flex h-18 md:h-44 md:w-fit justify-center items-center"
          >
            <img
              src="https://vavilongu.ru/storage/photo/resized/xy_1732x1732/e/fzeilpu3dhzj9zg_e6a5db71.jpg"
              alt="product-picture"
              className="h-18 w-full md:h-44 md:w-96"
            />
          </CardHeader>
        </div>
        <CardBody className="text-center">
          <Typography
            variant="h4"
            color="blue-gray"
            className="mb-2 text-base md:text-xl"
          >
            {name}
          </Typography>
          <Typography
            color="blue-gray"
            className="font-medium text-left mb-2 text-sm md:text-base"
            textGradient
          >
            Вес: {weight} г
          </Typography>
          <Typography
            color="blue-gray"
            className="font-medium text-left text-sm md:text-base"
            textGradient
          >
            Цена: {price} ₽
          </Typography>

          <div className="flex justify-center items-center w-auto mt-3">
            {quantity > 0 ? (
              <Button
                className="flex justify-between bg-base-blue items-center shadow-sm hover:shadow-light-blue gap-2 w-full normal-case text-base"
                size="sm"
              >
                {quantity > 1 ? (
                  <span
                    className="group border-r-2 h-full text-gray-400 hover:text-white hover:border-white border-gray-400"
                    onClick={() =>
                      dispatch(removeFromCart({ id, name, quantity, price }))
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4 md:size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14"
                      />
                    </svg>
                  </span>
                ) : (
                  <span
                    className="group border-r-2 h-full text-gray-400 hover:text-white hover:border-white border-gray-400"
                    onClick={() =>
                      dispatch(removeFromCart({ id, name, quantity, price }))
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4 md:size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </span>
                )}
                <span className="text-xs md:text-base">{quantity}</span>
                <span
                  className="group border-l-2 h-full text-gray-400 hover:text-white hover:border-white border-gray-400"
                  onClick={() =>
                    dispatch(addToCart({ id, name, quantity: 1, price }))
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4 md:size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </span>
              </Button>
            ) : (
              <Button
                className="flex justify-center items-center bg-base-blue shadow-sm hover:shadow-light-blue gap-2 w-full normal-case text-base"
                size="sm"
                onClick={() =>
                  dispatch(addToCart({ id, name, quantity: 1, price }))
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4 md:size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
                <span className="text-xs md:text-base">В корзину</span>
              </Button>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
