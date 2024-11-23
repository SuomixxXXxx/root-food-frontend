import "swiper/css";
import logo from "../assets/homeImages/Component 19.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchDishItemsByCategory } from "../redux/slices/dishItem.js";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { IMAGE_URL } from "../constants.js";
import { Swiper, SwiperSlide } from "swiper/react";
import { fetchCategories } from "../redux/slices/categories.js";
import { Typography } from "@material-tailwind/react";
import CardCategory from "../components/CardCategory.jsx";
import BakeCategory from "../assets/images/BakeCategory.png";

export default function HomePage() {
  const dispatch = useDispatch();
  const popularDishes = useSelector((state) => state.dishItems);
  const categories = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch(fetchDishItemsByCategory(2));
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="bg-light-blue min-h-fit px-3 md:px-5 pb-10">
      <div className="flex justify-center pt-20 md:pt-40">
        <img src={logo} alt="" className="logo-image" />
      </div>
      <div className="pt-8">
        <Typography className="text-left text-xl md:text-3xl mb-6">
          Каталог
        </Typography>
        <Swiper
          spaceBetween={20}
          slidesPerView={2}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          breakpoints={{
            380: { slidesPerView: 2 },
            768: { slidesPerView: 4, spaceBetween: 20 },
            1500: { slidesPerView: 5, spaceBetween: 50 },
            1920: { slidesPerView: 6, spaceBetween: 50 },
          }}
        >
          {categories.categories.items.data?.map((obj, index) => (
            <SwiperSlide key={index}>
              <CardCategory
                key={index}
                id = {obj.id}
                name={obj.name}
                image={BakeCategory}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="pt-8">
        <Typography className="text-left text-xl md:text-3xl mb-6">
          Популярные товары
        </Typography>
        <Swiper
          spaceBetween={50}
          slidesPerView={2}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          breakpoints={{
            380: { slidesPerView: 2, spaceBetween: 50},
            768: { slidesPerView: 4, spaceBetween: 20 },
            1500: { slidesPerView: 5, spaceBetween: 20 },
            1920: { slidesPerView: 6, spaceBetween: 20 },
          }}
        >
          {popularDishes.dishItems.items.data?.map((obj, index) => (
            <SwiperSlide key={index} className="h-80 md:h-96">
              <ProductCard
                id={obj.id}
                name={obj.name}
                weight={obj.weight}
                price={obj.price}
                totalQuantity={obj.quantity}
                imgURL={`${IMAGE_URL}/${obj.id}.jpg`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
