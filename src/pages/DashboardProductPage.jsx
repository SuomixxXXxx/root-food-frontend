import { useState, useEffect } from "react";
import DashboardProductCard from "../components/DashboardProductCard";
import { Button } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDishItemsByCategory } from "../redux/slices/dishItem";
import SideBarWorker from "../components/SideBarWorker";

export default function DashboardProductPage() {
  const [isHasRight, setIsHasRight] = useState(true);
  const params = useParams();
  const dispatch = useDispatch();
  const categoryDishes = useSelector((state) => state.dishItems);
  // const isCategoryDishesLoading = categoryDishes.dishItems.status === "loading";

  useEffect(() => {
    dispatch(fetchDishItemsByCategory(params.id));
  }, [params.id, dispatch]);

  return (
    <div className=" flex flex-col bg-blue-gray-100 pr-4 pl-4 pb-5 pt-5 md:flex-row min-h-screen md:pr-10 md:pl-10 ">
      <div className="hidden md:flex basis-1/4 mt-10  md:mt-14 md:ml-10">
        <SideBarWorker />
      </div>
      {isHasRight ? (
        <div className="absolute right-4 top-4">
          <Button color="yellow">Добавить блюдо</Button>
        </div>
      ) : (
        <></>
      )}
      <div className="mt-10 md:mt-14 mr-0 md:mr-10 ">
        <div className="grid grid-cols-2 place-items-center gap-4  md:grid-cols-3 3xl:grid-cols-4">
          {categoryDishes.dishItems.items.data?.map((product) => (
            <DashboardProductCard
              key={product.id}
              name={product.name}
              weight={product.weight}
              price={product.price}
              isAdmin={isHasRight}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
