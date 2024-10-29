import ProductCard from "../components/ProductCard";
import { SidebarCategory } from "../components/SidebarCategory";
import { useSelector } from "react-redux";

export default function ResultPage() {
  const products = useSelector((state) => state.dishItems);
  const isProductsLoading = products.dishItems.searchStatus === "loading";

  return (
    <div className=" flex flex-col bg-blue-gray-100 pr-4 pl-4 pb-5 pt-5 md:flex-row min-h-screen md:pr-10 md:pl-10 ">
      <div className="hidden md:flex basis-1/4 mt-10  md:mt-28 md:ml-10">
        <SidebarCategory />
      </div>
      <div className="mt-20 md:mt-28 mr-0 md:mr-10">
        {isProductsLoading ? (
          ""
        ) : products.dishItems.search.data.length > 0 ? (
          <div className="grid grid-cols-2 place-items-center gap-4 md:grid-cols-3 3xl:grid-cols-4">
            {products.dishItems.search.data?.map((obj, index) => (
              <ProductCard
                key={index}
                id={obj.id}
                name={obj.name}
                weight={obj.weight}
                price={obj.price}
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