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
    <div className=" flex flex-col md:flex-row max-h-max bg-blue-gray-100 pr-4 pl-4 md:pr-10 md:pl-10 pb-0">
      <div className="basis-full md:basis-1/4 mt-10 md:mt-28 ml-0 md:ml-10">
        <SidebarCategory />
      </div>

      <div className="mt-10 md:mt-28 mr-0 md:mr-10 ">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((obj, index) => (
            <ProductCard key={index} name={obj.name} weight={obj.weight} price={obj.price} />
          ))}
        </div>
      </div>
    </div>
  );
}
