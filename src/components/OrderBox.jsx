import { Typography, Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, addToCart } from "../redux/slices/cart";
import { IMAGE_URL } from "../constants";
import imgPlaceholder from "../assets/images/imgPlaceholder.svg";
export default function OrderBox() {
  const dispatch = useDispatch();
  const { items, amount, totalPrice } = useSelector((state) => state.cart);
  console.log(items);
  console.log(amount + "kolvo", totalPrice + "price");
  return (
    <div className="flex flex-col w-80 min-h-fit md:w-10/12">
      <Typography
        color="black"
        className="mb-2 text-center border-gray-300 text-xl md:text-2xl"
      >
        Корзина
      </Typography>
      <div className="text-left mt-4 min-h-fit md:h-40">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-row md:justify-between flex-wrap items-center pb-2 mb-4 overflow-y-auto border-b-2 border-dark-gray-blue"
          >
            <img
              src={`${IMAGE_URL}/${item.id}.jpg`}
              onError={(e) => {
                e.target.src = imgPlaceholder;
              }}
              className="small-image"
            />
            <div className="flex flex-col w-56 pl-3 md:pl-0 mr-0 break-words">
              <Typography color="black" className="text-base md:text-xl">
                {item.name}
              </Typography>
              <Typography className="text-sm md:text-base text-gray-500">
                {item.unitPrice} ₽/шт
              </Typography>
            </div>
            <div className="flex pt-3 md:pt-0">
              <div className="flex flex-row gap-1 items-center mr-3 ">
                <Button
                  className="flex justify-between items-center bg-base-blue  shadow-sm hover:shadow-light-blue shadow-light-blue gap-2 w-32 normal-case text-base"
                  size="sm"
                >
                  {item.quantity > 1 ? (
                    <span
                      className="group border-r-2 h-full text-gray-400 hover:text-white hover:border-white border-gray-400"
                      onClick={() => dispatch(removeFromCart(item))}
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
                      onClick={() => dispatch(removeFromCart(item))}
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
                  <span className="text-xs md:text-base">{item.quantity}</span>
                  <span
                    className={`group border-l-2 h-full text-gray-400 hover:text-white hover:border-white border-gray-400 ${
                      item.quantity === item.totalQuantity
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() =>
                      item.quantity < item.totalQuantity &&
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
                  </span>
                </Button>
              </div>
              <div className="flex flex-row justify-center items-center w-16 md:w-20">
                <Typography color="black">{item.price} ₽</Typography>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
