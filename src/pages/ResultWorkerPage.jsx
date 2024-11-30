import DashboardProductCard from "../components/DashboardProductCard";
import SideBarWorker from "../components/SideBarWorker";
import { useSelector } from "react-redux";
import { STATUS } from "../constants";
import { IMAGE_URL } from "../constants";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function ResultPage() {
  const [isHasRight, setIsHasRight] = useState(false);
  // const [productsList, setProductsList] = useState(products);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.dishItems);
  const selectedItem = useSelector((state) => state.dishItems.selectedItem);
  const isProductsLoading = products.dishItems.searchStatus === STATUS.PENDING;
  const categories = useSelector((state) => state.categories);
  

  useEffect(() => {
      if (localStorage.getItem("role") === "admin") {
        setIsHasRight(true);
      }
      
    }, [products]);

  return (
    <div className=" flex flex-col bg-light-blue pr-4 pl-4 pb-5 pt-5 md:flex-row min-h-screen md:pr-10 md:pl-10 ">
      <div className="hidden md:flex basis-1/4 mt-10  md:mt-28 md:ml-10">
        <SideBarWorker />
      </div>
      <div className="mt-20 md:mt-28 mr-0 md:mr-10">
        {isProductsLoading ? (
          ""
        ) :selectedItem !== null?(
          
          <div className="grid grid-cols-2 place-items-center gap-4 md:grid-cols-3 3xl:grid-cols-4">
            {console.log("Image URL for selectedItem:", `${IMAGE_URL}/${selectedItem.id}.jpg`)}
            <DashboardProductCard
              key={selectedItem.id}
              id={selectedItem.id}
              name={selectedItem.name}
              weight={selectedItem.weight}
              price={selectedItem.price}
              quantity={selectedItem.quantity}
              isAdmin={isHasRight}
              categories={selectedItem.categoryDTO.name}
              imageUrl={`${IMAGE_URL}/${selectedItem.id}.jpg`}
            />
          </div>
        ) : products.dishItems.search?.data?.length > 0 ? (
          <div className="grid grid-cols-2 place-items-center gap-4 md:grid-cols-3 3xl:grid-cols-4">
            {products.dishItems.search?.data?.map((obj, index) => (
              <DashboardProductCard
                key={index}
                id={obj.id}
                name={obj.name}
                weight={obj.weight}
                price={obj.price}
                quantity={obj.quantity}
                isAdmin={isHasRight}
                categories={obj.categoryDTO.name}
                imageUrl={`${IMAGE_URL}/${obj.id}.jpg`}
              />
            ))}
          </div>
        ) : (
          <div className="text-gray-600 text-lg mt-5 flex flex-col items-center">
            Ничего не найдено
          </div>
        )}

      </div>
    </div>
  );
}
