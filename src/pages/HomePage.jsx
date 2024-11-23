import logo from "../assets/homeImages/Component 19.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchDishItemsByCategory } from "../redux/slices/dishItem.js";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { IMAGE_URL } from "../constants.js";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Typography } from "@material-tailwind/react";

export default function HomePage() {
  const dispatch = useDispatch();
  const popularDishes = useSelector((state) => state.dishItems);
  useEffect(() => {
    dispatch(fetchDishItemsByCategory(2));
    console.log(popularDishes.dishItems.items.data);
  }, [dispatch]);

  return (
    <div className="bg-light-blue min-h-screen px-5">
      <div className="flex justify-center pt-40">
        <img src={logo} alt="" className="logo-image" />
      </div>
      
      <div className="pt-16">
        <Typography className="text-left text-3xl mb-6">
          Популярные товары
        </Typography>
        <Swiper
          spaceBetween={50}
          slidesPerView={2}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          breakpoints={{
            380: { slidesPerView: 2 },
            768: { slidesPerView: 4, spaceBetween: 20 },
            1500: { slidesPerView: 5, spaceBetween: 20 },
            1920: { slidesPerView: 6, spaceBetween: 20 },
          }}
        >
          {popularDishes.dishItems.items.data?.map((obj, index) => (
            <SwiperSlide key={index}>
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
