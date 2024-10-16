import { SidebarCategory } from "../components/SidebarCategory";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";

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
  const params  = useParams();
  console.log(params);
  return (
    <div className=" flex flex-col bg-blue-gray-100 pr-4 pl-4 pb-5 pt-5 md:flex-row min-h-screen md:pr-10 md:pl-10 ">
      <div className="hidden md:flex basis-1/4 mt-10  md:mt-28 md:ml-10">
        <SidebarCategory />
      </div>

      <div className="mt-20 md:mt-28 mr-0 md:mr-10 ">
        <div className="grid grid-cols-2 place-items-center gap-4  md:grid-cols-3 3xl:grid-cols-4">
        {products.map((obj, index) => (
            <ProductCard key={index} name={obj.name} weight={obj.weight} price={obj.price} />
          ))}
        </div>
      </div>
    </div>
  );
}
