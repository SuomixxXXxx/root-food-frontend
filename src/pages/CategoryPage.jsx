import CardCategory from "../components/CardCategory";
import { SidebarCategory } from "../components/SidebarCategory";
import FirstDishCategory from "../assets/images/FirstDishCategory.png";
import SecondDishCategory from "../assets/images/SecondDishCaregory.png";
import DrinkCategory from "../assets/images/DrinkCategory.png";
import BakeCategory from "../assets/images/BakeCategory.png";
import DessertCategory from "../assets/images/DessertCategory.png";
import SalatCategory from "../assets/images/SalatCategory.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../redux/slices/categories.js";
import { STATUS } from "../constants.js";

const categoriesMock = [
  {
    name: "Первое блюдо",
    image: FirstDishCategory,
  },
  {
    name: "Второе блюдо",
    image: SecondDishCategory,
  },
  {
    name: "Напитки",
    image: DrinkCategory,
  },
  {
    name: "Выпечка",
    image: BakeCategory,
  },
  {
    name: "Десерты",
    image: DessertCategory,
  },
  {
    name: "Салаты",
    image: SalatCategory,
  },
  {
    name: "Первое блюдо",
    image: FirstDishCategory,
  },
  {
    name: "Второе блюдо",
    image: SecondDishCategory,
  },
  {
    name: "Напитки",
    image: DrinkCategory,
  },
  {
    name: "Выпечка",
    image: BakeCategory,
  },
  {
    name: "Десерты",
    image: DessertCategory,
  },
  {
    name: "Салаты",
    image: SalatCategory,
  },
  {
    name: "Первое блюдо",
    image: FirstDishCategory,
  },
  {
    name: "Второе блюдо",
    image: SecondDishCategory,
  },
  {
    name: "Напитки",
    image: DrinkCategory,
  },
  {
    name: "Выпечка",
    image: BakeCategory,
  },
  {
    name: "Десерты",
    image: DessertCategory,
  },
  {
    name: "Салаты",
    image: SalatCategory,
  },
  {
    name: "Первое блюдо",
    image: FirstDishCategory,
  },
  {
    name: "Второе блюдо",
    image: SecondDishCategory,
  },
  {
    name: "Напитки",
    image: DrinkCategory,
  },
  {
    name: "Выпечка",
    image: BakeCategory,
  },
  {
    name: "Десерты",
    image: DessertCategory,
  },
  {
    name: "Салаты",
    image: SalatCategory,
  },
];

export default function CategoryPage() {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories);
  const isCategoriesLoading = categories.categories.status === STATUS.PENDING;
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <div className="flex flex-col bg-light-blue pr-4 pl-4 pt-5 pb-6 md:flex-row min-h-fit md:pr-10 md:pl-10">
      <div className="hidden md:flex basis-1/4 mt-10 md:mt-28 md:ml-10">
        <SidebarCategory />
      </div>
      <div className="mt-20 md:mt-28 md:ml-16 md:mb-5">
        <div className="grid grid-cols-2 place-items-center gap-4 md:gap-6 sm:grid-cols-2 md:grid-cols-3 3xl:grid-cols-4">
          {(isCategoriesLoading
            ? categoriesMock
            : categories.categories.items.data
          ).map((category, index) =>
            isCategoriesLoading ? (
              <CardCategory
              key={index}
              name={categoriesMock.name}
              image={categoriesMock.image}
            />
            ) : (
              <CardCategory
                key={index}
                id = {category.id}
                name={category.name}
                image={BakeCategory}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
