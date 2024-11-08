import { useState, useEffect } from "react";
import DashboardProductCard from "../components/DashboardProductCard";
import { Button, Typography, Input, Accordion, AccordionBody, AccordionHeader } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDishItemsByCategory } from "../redux/slices/dishItem";
import SideBarWorker from "../components/SideBarWorker";
import Modal from "../components/Modal";
import uploadImage from "../assets/images/uploadImage.png";
import { addProductData } from "../redux/slices/dishItem";
import { fetchCategories } from "../redux/slices/categories";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { uploadImagePost } from "../redux/slices/dishItem";

export default function DashboardProductPage() {
  const [isHasRight, setIsHasRight] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const categoryDishes = useSelector((state) => state.dishItems);
  const [open, setOpen] = useState(false);
  const categories = useSelector((state) => state.categories);
  const [openCategoties, setOpenCategoties] = useState(false);
  const [nameProduct, setNameProduct] = useState("");
  const [weightProduct, setWeightProduct] = useState("");
  const [priceProduct, setPriceProduct] = useState("");
  const [categoryProduct, setCategoryProduct] = useState("");
  const [image, setImage] = useState(null);
  const [view, setView] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");


  const handleOpenCategories = () => {
    if (!categories || categories.length === 0) {
      dispatch(fetchCategories());
    }
    setOpenCategoties((prev) => !prev);
  };
  
  const handleCategorySelect = (categoryId,categoryName) => {
    setCategoryProduct(categoryId);
    setSelectedCategoryName(categoryName);
    console.log(categoryProduct);
    setOpenCategoties(false);
  };
  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file)
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setView(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    const formData = {
      name: nameProduct,
      weight: weightProduct,
      price: priceProduct,
      categoryDTO: {
        id:categoryProduct
      }
    };

    console.log(formData);
    const response= await dispatch(addProductData(formData)).unwrap();
    const idDTO = response.data.id;
    const imageForm={
      id: idDTO,
      file: image,
    }
    console.log(imageForm);
    await dispatch(uploadImagePost(imageForm));
    setOpen(false);
    const status = await dispatch(addProductData(formData)).unwrap();
    if (status.status === 200) {
      dispatch(fetchDishItemsByCategory(params.id));
    }
  };

  // const isCategoryDishesLoading = categoryDishes.dishItems.status === "loading";

  useEffect(() => {
    dispatch(fetchDishItemsByCategory(params.id));
    if (localStorage.getItem("role") === "admin") {
      console.log("admin");
      setIsHasRight(true);
    };
  }, [params.id, dispatch]);

  return (
    <div className=" flex flex-col bg-blue-gray-100  pb-5 pt-5 md:flex-row min-h-screen  ">
      <div className="hidden md:flex basis-1/4 mt-14  md:ml-10">
        <SideBarWorker />
      </div>
      {isHasRight ? (
        <div className="absolute right-4 top-4">
          <Button
            color="yellow"
            onClick={handleOpenModal}>
            Добавить блюдо</Button>
        </div>
      ) : (
        <></>
      )}
      <div>
        <div className="grid grid-cols-2 place-items-center gap-4  md:grid-cols-3 mt-14 3xl:grid-cols-4">
          {categoryDishes.dishItems.items?.data?.map((product) => (
            <DashboardProductCard
              key={product.id}
              name={product.name}
              weight={product.weight}
              price={product.price}
              isAdmin={isHasRight}
            />
          ))}
        </div>
      </div>
      <Modal open={open} onClose={() =>{handleCloseModal;handleSaveChanges}}>
        <Typography variant="h5" color="black" className="mb-4">
          Изменение карточки товара
        </Typography>
        <div className="flex justify-center items-center h-56 mb-4">
          <input
            type="file"
            id="imageUpload"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
          <label htmlFor="imageUpload">
            <img
              src={
                view ||
                uploadImage
              }
              alt="product"
              className="object-contain h-48 w-48 cursor-pointer"
            />
          </label>
        </div>
        <div className="flex flex-col space-y-2">
          <Input
            type="text"
            value={nameProduct}
            label="Название"
            onChange={(e) => setNameProduct(e.target.value)}>
          </Input>
          <Input
            type="text"
            value={weightProduct}
            label="Вес"
            onChange={(e) => setWeightProduct(e.target.value)}
          >
          </Input>
          <Input
            type="text"
            value={priceProduct}
            label="Цена"
            onChange={(e) => setPriceProduct(e.target.value)}>
          </Input>
          <div>
            <Accordion
              open={openCategoties}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${openCategoties ? "rotate-180" : ""}`}
                />
              }
            >
              <AccordionHeader onClick={handleOpenCategories} className="p-3">
                <Typography color="blue-gray" className="font-normal">
                {selectedCategoryName ? selectedCategoryName : "Категория"}
                </Typography>
              </AccordionHeader>
              {openCategoties && (
                <AccordionBody className="py-1">
                  <ul className="p-0">
                    {
                      categories.categories.items.data?.map((items) => (
                        <li
                          key={items.id}
                          className="flex items-center pl-6 cursor-pointer hover:bg-blue-100 transition-all duration-200 rounded-lg"
                          onClick={() =>handleCategorySelect(items.id, items.name)}
                        >
                          <Typography className="text-base font-medium text-blue-gray-700">
                            {items.name}
                          </Typography>
                        </li>
                      ))
                    }
                  </ul>
                </AccordionBody>
              )}
            </Accordion>
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <Button color="green" onClick={handleSaveChanges }>
            Сохранить</Button>
          <Button onClick={handleCloseModal} 
          color="blue">
            Закрыть
          </Button>
        </div>
      </Modal>
    </div>
  );
}
