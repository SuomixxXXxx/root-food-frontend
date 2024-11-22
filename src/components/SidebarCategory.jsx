import { Typography} from "@material-tailwind/react";
import firstDish from "../assets/images/FirstDish.png";
import secondtDish from "../assets/images/SecondDish.png";
import drink from "../assets/images/Napitok.png";
import bake from "../assets/images/Vipichka.png";
import dessert from "../assets/images/Desert.png";
import salat from "../assets/images/Salat.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/slices/categories.js";
import { useEffect } from "react";
import { STATUS } from "../constants.js";

const categoriesMock = [
  {
    id: 1,
    label: "Первое блюдо", //name:пирог
    img: firstDish,
  },
  {
    id: 2,
    label: "Второе блюдо",
    img: secondtDish,
  },
  {
    id: 3,
    label: "Напитки",
    img: drink,
  },
  {
    id: 4,
    label: "Выпечка",
    img: bake,
  },
  {
    id: 5,
    label: "Десерты",
    img: dessert,
  },
  {
    id: 5,
    label: "Салаты",
    img: salat,
  },
];

export function SidebarCategory() {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories);
  const isCategoriesLoading = categories.categories.status === STATUS.PENDING;
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <div className="flex flex-grow flex-col h-fit w-full max-w-[20rem] p-6 shadow-2xl shadow-light-blue rounded-xl bg-white">
      <div>
        <Typography variant="h5" className="font-bold text-xl">
          Каталог
        </Typography>
      </div>
      <div className="space-y-4 py-3">
        {(isCategoriesLoading
          ? categoriesMock
          : categories.categories.items.data
        ).map((item, index) =>
          isCategoriesLoading ? (
            <div
              key={index}
              className="flex items-center hover:bg-light-blue transition-all duration-200 rounded-lg p-2 cursor-pointer"
            >
              {item.img && (
                <img
                  src={item.img}
                  alt={item.label}
                  className="h-10 w-10 md:h-12 md:w-12 mr-4 rounded-full shadow-md"
                />
              )}
              <Typography className="text-base font-medium text-black">
                {item.label}
              </Typography>
            </div>
          ) : (
            <Link to={`/category/${item.id}`} key={index}>
              <div
                key={index}
                className="flex items-center hover:bg-light-blue transition-all duration-200 rounded-lg p-2 cursor-pointer"
              >
                <img
                  src={dessert}
                  alt={dessert}
                  className="h-10 w-10 md:h-12 md:w-12 mr-4 rounded-full shadow-sm shadow-light-blue"
                />
                <Typography className="text-base font-medium text-black">
                  {item.name}
                </Typography>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
}
