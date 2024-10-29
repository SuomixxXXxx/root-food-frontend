import React from "react";
import {
  Card,
  CardBody,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, addToCart } from "../redux/slices/cart";
export default function OrderBox() {
  const dispatch = useDispatch();
  const { items, amount, totalPrice } = useSelector((state) => state.cart);
  console.log(items);
  console.log(amount + "kolvo", totalPrice + "price");
  return (
    <div>
      <Card className="flex flex-col mt-10 w-80 h-80 md:w-128 md:h-60 ">
        <CardBody className="pb-2">
          <Typography variant="h5" color="black" className="mb-2 text-center border-b border-gray-300 text-base md:text-xl">
            Ваш заказ
          </Typography>
          <div className="text-left mt-4 h-60 overflow-y-auto md:h-40">
          {items.map((item, index) => (
              <div
                key={index}
                className="flex flex-row justify-between flex-wrap items-center mb-4 overflow-y-auto"
              >
                <div className="flex flex-row flex-wrap mr-0">
                  <Typography color="black" className="text-base md:text-xl">{item.name}</Typography>
                </div>
                <div className="flex">
                  <div className="flex flex-row gap-1 items-center mr-3 ">
                    <IconButton
                      color="blue"
                      className="w-20 h-8 md:w-32 md:h-20"
                      onClick={() => dispatch(removeFromCart(item))}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 12h14"
                        />
                      </svg>
                    </IconButton>
                    <div className="flex justify-center w-8 md:w-10">
                      <Typography color="black">{item.quantity}</Typography>
                    </div>
                    <IconButton
                      color="blue"
                      className="w-full h-8 md:w-32 md:h-20"
                      onClick={() =>
                        dispatch(
                          addToCart({
                            id: item.id,
                            name: item.name,
                            quantity: 1,
                            price: item.price / item.quantity,
                          })
                        )
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
                    </IconButton>
                  </div>
                  <div className="flex flex-row justify-center items-center w-16 md:w-20">
                    <Typography color="black">{item.price} ₽</Typography>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}