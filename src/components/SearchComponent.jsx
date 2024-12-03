import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import {
    Button,
    Input,
  } from "@material-tailwind/react";

export default function SearchComponent() {
    let role = localStorage.getItem("role");
    const dispatch = useDispatch();
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
            if(role=="admin" || role =="staff"){
                navigate(`/dashboard/searchWorker?q=${searchText}`)
            }else{
                navigate(`/search?q=${searchText}`);
            }
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
        if(role=="admin" || role =="staff"){
            navigate("/dashboard/searchWorker")
        }else{
            navigate("/search");
        }
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


    return(
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
                            className={`p-2 cursor-pointer ${indexItems === index ? "bg-gray-200" : "hover:bg-gray-100"
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
    ); 
}