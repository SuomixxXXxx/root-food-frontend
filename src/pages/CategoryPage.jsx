import CardCategory from "../components/CardCategory";
import { SidebarCategory } from "../components/SidebarCategory";
import FirstDishCategory from "../assets/images/FirstDishCategory.png";
import SecondDishCategory from "../assets/images/SecondDishCaregory.png";
import DrinkCategory from "../assets/images/DrinkCategory.png";
import BakeCategory from "../assets/images/BakeCategory.png";
import DessertCategory from "../assets/images/DessertCategory.png";
import SalatCategory from "../assets/images/SalatCategory.png";

const categories = [
  { 
    name: "Первое блюдо", 
    image: FirstDishCategory 
  },
  { 
    name: "Второе блюдо", 
    image: SecondDishCategory 
  },
  { 
    name: "Напитки", 
    image: DrinkCategory 
  },
  { 
    name: "Выпечка", 
    image: BakeCategory 
  },
  { 
    name: "Десерты", 
    image: DessertCategory 
  },
  { 
    name: "Салаты", image: SalatCategory 
  },
  { 
    name: "Первое блюдо", 
    image: FirstDishCategory 
  },
  { 
    name: "Второе блюдо", 
    image: SecondDishCategory 
  },
  { 
    name: "Напитки", 
    image: DrinkCategory 
  },
  { 
    name: "Выпечка", 
    image: BakeCategory 
  },
  { 
    name: "Десерты", 
    image: DessertCategory 
  },
  { 
    name: "Салаты", image: SalatCategory 
  },
  { 
    name: "Первое блюдо", 
    image: FirstDishCategory 
  },
  { 
    name: "Второе блюдо", 
    image: SecondDishCategory 
  },
  { 
    name: "Напитки", 
    image: DrinkCategory 
  },
  { 
    name: "Выпечка", 
    image: BakeCategory 
  },
  { 
    name: "Десерты", 
    image: DessertCategory 
  },
  { 
    name: "Салаты", image: SalatCategory 
  },
  { 
    name: "Первое блюдо", 
    image: FirstDishCategory 
  },
  { 
    name: "Второе блюдо", 
    image: SecondDishCategory 
  },
  { 
    name: "Напитки", 
    image: DrinkCategory 
  },
  { 
    name: "Выпечка", 
    image: BakeCategory 
  },
  { 
    name: "Десерты", 
    image: DessertCategory 
  },
  { 
    name: "Салаты", image: SalatCategory 
  },
];

export default function CategoryPage() {
  return (
    <div className="flex flex-col bg-blue-gray-100 pr-4 pl-4 pb-5 pt-5 md:flex-row min-h-screen md:pr-10 md:pl-10">
      <div className="hidden md:flex basis-1/4 mt-10  md:mt-28 md:ml-10">
        <SidebarCategory />
      </div>
      <div className=" mt-20 md:mt-28 mr-0 md:mr-10">
        <div className="grid grid-cols-2 place-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 3xl:grid-cols-4">
          {categories.map((category, index) => (
            <CardCategory key={index} name={category.name} image={category.image} />
          ))}
        </div>
      </div>
    </div>
  );
}