import CardCategory from "../components/CardCategory";
import { SidebarCategory } from "../components/SidebarCategory";
import FirstDishCategory from "../assets/images/FirstDishCategory.png";
import SecondDishCategory from "../assets/images/SecondDishCaregory.png";
import DrinkCategory from "../assets/images/DrinkCategory.png";
import BakeCategory from "../assets/images/BakeCategory.png";
import DessertCategory from "../assets/images/DessertCategory.png";
import SalatCategory from "../assets/images/SalatCategory.png";

const categories = [
  { name: "Первое блюдо", image: FirstDishCategory },
  { name: "Второе блюдо", image: SecondDishCategory },
  { name: "Напитки", image: DrinkCategory },
  { name: "Выпечка", image: BakeCategory },
  { name: "Десерты", image: DessertCategory },
  { name: "Салаты", image: SalatCategory },
];

export default function CategoryPage() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-blue-gray-100 px-4 md:px-20">
      <div className="hidden lg:block basis-1/4 mt-28">
        <SidebarCategory />
      </div>
      <div className=" flex flex-col items-center basis-full lg:basis-3/4 mt-28 lg:mt-28 pl-0 lg:pl-10">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <CardCategory
              key={index}
              name={category.name}
              image={category.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}