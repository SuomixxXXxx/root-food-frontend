import { SidebarCategory } from "../components/SidebarCategory";
import ProductCard from "../components/ProductCard";

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
  return (
    <div className=" flex flex-row max-h-max bg-blue-gray-100  pr-40 pl-40  pb-0">
      <div className="basis-1/4 mt-28 ml-20">
        <SidebarCategory />
      </div>

      <div className="mt-28 mr-20 ">
        <div className="grid basis-2/4 md:grid-cols-3 grid-cols-2  ">
        {products.map((obj, index) => (
            <ProductCard key={index} name={obj.name} weight={obj.weight} price={obj.price} />
          ))}
        </div>
      </div>
    </div>
  );
}
