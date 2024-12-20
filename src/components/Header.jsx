import { useEffect } from "react";
import aquariumLogo from "../assets/aqua.svg";
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
import {
  clearSelectedItem,
  fetchDishItemsByName,
  setNavigated,
} from "../redux/slices/dishItem.js";
import {
  fetchAutocompleteSuggestions,
  setSelectedItem,
} from "../redux/slices/dishItem.js";
import { useNavigate } from "react-router-dom";
import SuggestionBox from "./SuggestionBox.jsx";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
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
  const { amount, totalPrice } = useSelector((state) => state.cart);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSuggest, setOpenSuggest] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [searchTextSuggestion, setSearchTextSuggestion] = useState("");
  const [indexItems, setIndexItems] = useState(-1);

  const navigate = useNavigate();
  const isNavigated = useSelector((state) => state.dishItems.isNavigated);

  useEffect(() => {
    if (isNavigated) {
      setOpenSuggest(false);
      setSearchText("");
      setSearchData([]);
      dispatch(setNavigated(false));
    }
  }, [isNavigated, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      if (searchTextSuggestion.trim() !== "") {
        try {
          const response = await dispatch(
            fetchAutocompleteSuggestions({ name: searchTextSuggestion })
          ).unwrap();
          setSearchData(response);
          setOpenSuggest(response.length > 0);
        } catch (error) {
          console.error("Ошибка при получении данных:", error);
        }
      } else {
        setSearchData([]);
        setOpenSuggest(false);
      }
    };

    fetchData();
  }, [searchTextSuggestion, dispatch]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setOpenSuggest(false);
    try {
      const response = await dispatch(
        fetchDishItemsByName({ name: searchText })
      ).unwrap();
      setSearchData(response.data);
      dispatch(clearSelectedItem());
      dispatch(setNavigated(true));
      navigate("/search");
      setSearchTextSuggestion("");
      setSearchData([]);
      setSearchText("");
    } catch (error) {
      console.error("Ошибка при поиске:", error);
    }
  };

  const handleSuggestionClick = (item) => {
    setOpenSuggest(false);
    dispatch(setSelectedItem(item));
    setOpenSuggest(false);
    setSearchText("");
    setSearchTextSuggestion("");
    setSearchData([]);
    dispatch(setNavigated(true));
    setIndexItems(-1);
    navigate("/search");
  };

  const handleKeyDown = (e) => {
    if (indexItems < searchData.length) {
      if (e.key === "ArrowUp" && indexItems > 0) {
        setIndexItems((prev) => prev - 1);
      } else if (e.key === "ArrowDown" && indexItems < searchData.length - 1) {
        setIndexItems((prev) => prev + 1);
      } else if (e.key === "Enter") {
        if (indexItems === -1) {
          handleSearch(e);
        } else if (indexItems >= 0) {
          handleSuggestionClick(searchData[indexItems]);
          setIndexItems(-1);
        }
      }
    } else {
      setIndexItems(-1);
    }
  };

  const handleSearchBlur = () => {
    setTimeout(() => setOpenSuggest(false), 150);
  };

  return (
    <Navbar
      variant="gradient"
      color="white!important"
      className="max-w-full rounded-none border-b-1 shadow-light-blue px-4 md:px-8 "
      style={styleNav}
    >
      <div className="flex flex-row justify-between flex-wrap items-center">
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

        <div className="flex gap-5 h-max items-center">
          <Link to="/">
            <div className="w-32 h-max">
              <img src={aquariumLogo} alt="My aquariumLogo" />
            </div>
          </Link>
          <Link className="hidden lg:flex" to="/category">
            <Button
              size="sm"
              className="hidden lg:flex normal-case bg-base-blue hover:shadow-none shadow-none rounded-2xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                />
              </svg>
              <Typography variant="small" className="flex p-1 text-base">
                Каталог
              </Typography>
            </Button>
          </Link>
        </div>
        <div className="relative flex lg:w-full lg:max-w-[28rem] h-max">
          <Input
            type="search"
            label="Поиск"
            color="blue"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setSearchTextSuggestion(e.target.value);
              setOpenSuggest(e.target.value !== "");
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setOpenSuggest(searchData.length > 0)}
            onBlur={handleSearchBlur}
            className="lg:pr-20 rounded-l-md border-r-0"
            containerProps={{
              className: "min-w-0",
            }}
          />
          <Button
            size="sm"
            onClick={handleSearch}
            className="!absolute right-0 top-0 h-full rounded-r-md rounded-l-none border-l-0 hover:shadow-none shadow-none bg-base-blue"
            type="submit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="m-auto size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </Button>
          <SuggestionBox
            open={openSuggest}
            onClose={() => setOpenSuggest(false)}
          >
            {searchData && searchData.length > 0 && (
              <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 mt-1 z-10 rounded shadow-lg">
                {searchData.map((item, index) => (
                  <li
                    key={item.id}
                    className={`p-2 cursor-pointer ${
                      indexItems === index ? "bg-gray-200" : "hover:bg-gray-100"
                    }`}
                    onClick={() => handleSuggestionClick(item)}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </SuggestionBox>
        </div>
        <div className="hidden lg:flex flex-row gap-5 items-center">
          <Link to="/cart">
            <div className="w-14 group flex flex-col items-center max-h-fit text-gray-600 hover:text-base-blue">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8 group-hover:stroke-base-blue"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              {amount == 0 ? (
                <Typography variant="small" className="flex text-base">
                  Корзина
                </Typography>
              ) : (
                <Typography variant="small" className="flex text-base">
                  {totalPrice} ₽
                </Typography>
              )}
            </div>
          </Link>
          {isAuth ? (
            <div>
              <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="w-16 flex flex-col items-center max-h-fit text-gray-600 cursor-pointer">
                  <div className="group flex flex-col items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-8 group-hover:stroke-base-blue"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                    <Typography
                      variant="small"
                      className="text-base group-hover:text-base-blue"
                    >
                      Кабинет
                    </Typography>
                  </div>
                </MenuButton>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white border-2 ring-1 ring-gray-500 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                      >
                        Мои заказы
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/account"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                      >
                        Мой аккаунт
                      </Link>
                    </MenuItem>
                  </div>
                  <div className="py-1">
                    <MenuItem>
                      <div
                        onClick={() => setOpen(true)}
                        className="flex cursor-pointer px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-dark-red data-[focus]:outline-none"
                      >
                        <span className="pr-1">Выйти</span>
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
                            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                          />
                        </svg>
                      </div>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            </div>
          ) : (
            <Link to="/login">
              <div className="w-16 group flex flex-col items-center max-h-fit text-gray-600 hover:text-base-blue">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-8 group-hover:stroke-base-blue"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                <Typography variant="small" className="flex text-base">
                  Вход
                </Typography>
              </div>
            </Link>
          )}
        </div>
      </div>
      {isMenuOpen ? (
        <div className="lg:hidden flex flex-col w-full">
          <li className="list-none">
            <Link to="/orders" onClick={() => setIsMenuOpen(false)}>
              <Typography variant="small" className="flex pt-3">
                Мои заказы
              </Typography>
            </Link>
          </li>
          <li className="list-none">
            <Link to="/account" onClick={() => setIsMenuOpen(false)}>
              <Typography variant="small" className="flex pt-3">
                Мой аккаунт
              </Typography>
            </Link>
          </li>
          <li className="list-none">
            {isAuth ? (
              <Typography
                onClick={() => {
                  setOpen(true);
                  setIsMenuOpen(false);
                }}
                variant="small"
                className="flex pt-3"
              >
                <span className="pr-1">Выйти</span>
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
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                  />
                </svg>
              </Typography>
            ) : (
              <Link
                to="/login"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                <Typography variant="small" className="flex pt-3">
                  Вход
                </Typography>
              </Link>
            )}
          </li>
        </div>
      ) : (
        <></>
      )}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Typography variant="h5" color="black">
          Вы действительно хотите выйти?
        </Typography>
        <div className="flex justify-between mt-2">
          <Button onClick={onClickLogout} color="blue" variant="contained">
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
      <div className="lg:hidden fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
        <div className="grid h-full max-w-lg grid-cols-4 place-items-center mx-auto">
          <Link to="/">
            <div className="flex flex-col items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              <Typography variant="small" className="flex text-base">
                Главная
              </Typography>
            </div>
          </Link>
          <Link to="/category">
            <div className="flex flex-col items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                />
              </svg>
              <Typography variant="small" className="flex text-base">
                Каталог
              </Typography>
            </div>
          </Link>
          <Link to="/cart">
            <div className="flex flex-col items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8 group-hover:stroke-base-blue"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              {amount == 0 ? (
                <Typography variant="small" className="flex text-base">
                  Корзина
                </Typography>
              ) : (
                <Typography variant="small" className="flex text-base">
                  {totalPrice} ₽
                </Typography>
              )}
            </div>
          </Link>
          {isAuth ? (
            <>
              <div className="flex flex-col items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-7 group-hover:stroke-base-blue"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                <Typography
                  variant="small"
                  className="text-base group-hover:text-base-blue"
                >
                  Кабинет
                </Typography>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <div className="flex flex-col items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-7 group-hover:stroke-base-blue"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                  <Typography
                    variant="small"
                    className="text-base group-hover:text-base-blue"
                  >
                    Вход
                  </Typography>
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </Navbar>
  );
}
