import React, { useEffect } from "react";
import aquariumLogo from "../assets/aquariumLogo.svg";
import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Input,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth } from "../redux/slices/auth.js";
import { logout } from "../redux/slices/auth.js";
import Modal from "./Modal.jsx";
import { useState } from "react";
import { clearSelectedItem, fetchDishItemsByName } from "../redux/slices/dishItem.js";
import { fetchAutocompleteSuggestions, setSelectedItem } from "../redux/slices/dishItem.js";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const styleNav = {
  position: "fixed",
  top: 0,
  width: "100%",
  zIndex: 20,
};
export default function Header() {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const onClickLogout = () => {
    dispatch(logout());
    setOpen(false);
  };
  const { amount } = useSelector((state) => state.cart);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [searchTextSuggestion, setSearchTextSuggestion] = useState("");
  const [indexItems, setIndexItems] = useState(-1)
  

  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchAutocompleteSuggestions({ name: searchTextSuggestion })).unwrap();
        console.log("Autocomplete suggestions:", response);
        setSearchData(response);

      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    if (searchTextSuggestion) {
      fetchData();
    } else {
      setSearchData([]);
    }
  }, [searchTextSuggestion, dispatch]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(fetchDishItemsByName({ name: searchText })).unwrap();
      console.log("byname suggestions:", response.data);
      setSearchData(response.data);
      console.log("search data after byname:", searchData)
      dispatch(clearSelectedItem())
      navigate("/search");
      setSearchData([]);
      setSearchText("");
    } catch (error) {
      console.error("Ошибка при поиске:", error);
    }
  };

  const handleSuggestionClick = (item) => {
    dispatch(setSelectedItem(item));
    navigate("/search");
    setSearchData([]);
    setSearchText("");
  };

  const handleKeyDown = (e) => {
    if(indexItems<searchData.length){
      if(e.key === "ArrowUp" && indexItems > 0){
        setIndexItems((prev) => prev - 1)
      }
      else if(e.key === "ArrowDown" && indexItems < searchData.length - 1){
        setIndexItems((prev) => prev + 1)
      }
      else if(e.key === "Enter" ){
        if (indexItems === -1 || indexItems === 0) {
          handleSearch(e);
        }else if (indexItems > 0) {
          handleSuggestionClick(searchData[indexItems]);
          // setIndexItems(-1);
        }
      }
    }else{
      setIndexItems(-1);
    }
  };



  return (
    <Navbar
      variant="gradient"
      color="white!important"
      className="max-w-full rounded-none border-b-1 "
      style={styleNav}
    >
      <div className="flex flex-row justify-between flex-wrap items-center">
        <div className="flex gap-5 h-max">
          <div className="w-32 h-max ">
            <img src={aquariumLogo} alt="My aquariumLogo" />
          </div>
          <Link className="hidden lg:flex" to="/category">
            <Button className="hidden lg:flex" color="blue">
              Категории
            </Button>
          </Link>
        </div>
        <div className="relative flex lg:w-full lg:max-w-[28rem] h-max">
          <Input
            type="search"
            label="Поиск"
            color="blue"
            value={searchText}
            onChange={(e) => { setSearchText(e.target.value); setSearchTextSuggestion(e.target.value) }}
            onKeyDown={handleKeyDown}
            className="lg:pr-20"
            containerProps={{
              className: "min-w-0",
            }}
          />
          <Button
            size="sm"
            color="blue"
            onClick={handleSearch}
            className="!absolute right-1 top-1 bottom-1 rounded"
            type="submit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="m-auto size-5 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </Button>

          {searchData && searchData.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 mt-1 z-10 rounded shadow-lg">
              {searchData?.map((item,index) => (
                <li
                  key={item.id}
                  className={`p-2 cursor-pointer ${
                    indexItems === index ? "bg-gray-200" : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleSuggestionClick(item)}>
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="hidden lg:flex flex-row gap-5">
          <Link to="/cart">
            <div className="flex flex-col items-center max-h-fit">
              <IconButton color="blue">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </IconButton>
              {amount == 0 ? (
                <Typography variant="small" className="flex p-1 font-medium">
                  Корзина
                </Typography>
              ) : (
                <Typography
                  variant="small"
                  className="flex p-1 font-bold text-blue-800"
                >
                  {amount}
                </Typography>
              )}
            </div>
          </Link>
          {isAuth ? (
            <div
              onClick={() => setOpen(true)}
              className="flex flex-col items-center max-h-fit"
            >
              <IconButton color="red">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </IconButton>
              <Typography variant="small" className="flex p-1 font-medium">
                Выход
              </Typography>
            </div>
          ) : (
            <Link to="/login">
              <div className="flex flex-col items-center max-h-fit">
                <IconButton color="blue">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </IconButton>
                <Typography variant="small" className="flex p-1 font-medium">
                  Вход
                </Typography>
              </div>
            </Link>
          )}
        </div>
        <i
          className="lg:hidden cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {!isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          )}
        </i>
        {isMenuOpen ? (
          <div className="lg:hidden flex flex-col w-full">
            <li className="list-none">
              <Link to="/category">
                <Typography variant="small" className="flex pt-5 font-medium">
                  Категории
                </Typography>
              </Link>
            </li>
            <li className="list-none">
              <Link to="/cart">
                <Typography variant="small" className="flex pt-5 font-medium">
                  Корзина
                </Typography>
              </Link>
            </li>
            <li className="list-none">
              {isAuth ? (
                <Typography
                  onClick={() => setOpen(true)}
                  variant="small"
                  className="flex pt-5 font-medium"
                >
                  Выход
                </Typography>
              ) : (
                <Link to="/login">
                  <Typography variant="small" className="flex pt-5 font-medium">
                    Вход
                  </Typography>
                </Link>
              )}
            </li>
          </div>
        ) : (
          <></>
        )}
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Typography variant="h5" color="black">
          Вы действительно хотите выйти?
        </Typography>
        <div className="flex justify-between mt-2">
          <Button
            onClick={onClickLogout}
            color="blue"
            variant="contained"
          >
            Да
          </Button>
          <Button
            onClick={() => setOpen(false)}
            color="red"
            variant="contained"
          >
            Нет
          </Button>
        </div>
      </Modal>
    </Navbar>
  );
}
