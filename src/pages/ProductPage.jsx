import { SidebarCategory } from "../components/SidebarCategory";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchDishItemsByCategory } from "../redux/slices/dishItem.js";
import { STATUS, IMAGE_URL } from "../constants.js";

const products = [
  {
    name: "Котлета",
    weight: "100",
    price: "150",
  },
  {
    name: "Торт",
    weight: "100",
    price: "150",
  },
  {
    name: "Рис",
    weight: "100",
    price: "150",
  },
  {
    name: "Гречка",
    weight: "100",
    price: "150",
  },
  {
    name: "Макарони",
    weight: "100",
    price: "150",
  },
  {
    name: "Макарони",
    weight: "100",
    price: "150",
  },
  {
    name: "Макарони",
    weight: "100",
    price: "150",
  },
  {
    name: "Макарони",
    weight: "100",
    price: "150",
  },
  {
    name: "Котлета",
    weight: "100",
    price: "150",
  },
  {
    name: "Торт",
    weight: "100",
    price: "150",
  },
  {
    name: "Рис",
    weight: "100",
    price: "150",
  },
  {
    name: "Гречка",
    weight: "100",
    price: "150",
  },
  {
    name: "Макарони",
    weight: "100",
    price: "150",
  },
  {
    name: "Макарони",
    weight: "100",
    price: "150",
  },
  {
    name: "Макарони",
    weight: "100",
    price: "150",
  },
  {
    name: "Макарони",
    weight: "100",
    price: "150",
  },
];

export default function ProductPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const categoryDishes = useSelector((state) => state.dishItems);
  const isCategoryDishesLoading = categoryDishes.dishItems.status === STATUS.PENDING;

  useEffect(() => {
    dispatch(fetchDishItemsByCategory(params.id));
  }, [params.id, dispatch]);

  return (
    <div className=" flex flex-col bg-blue-gray-100 pr-4 pl-4 pb-5 pt-5 md:flex-row min-h-screen md:pr-10 md:pl-10 ">
      <div className="hidden md:flex basis-1/4 mt-10  md:mt-28 md:ml-10">
        <SidebarCategory />
      </div>
      <div className="mt-20 md:mt-28 mr-0 md:mr-10 ">
        <div className="grid grid-cols-2 place-items-center gap-4  md:grid-cols-3 3xl:grid-cols-4">
          {(isCategoryDishesLoading
            ? products
            : categoryDishes.dishItems.items.data
          ).map((obj, index) =>
            isCategoryDishesLoading ? (
              <ProductCard
                key={index}
                id={obj.id}
                name={obj.name}
                weight={obj.weight}
                price={obj.price}
              /> // TODO: skeleton
            ) : (
              <ProductCard
                key={index}
                id={obj.id}
                name={obj.name}
                weight={obj.weight}
                price={obj.price}
                totalQuantity={obj.quantity}
                imgURL={`${IMAGE_URL}/${obj.id}.jpg`}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

