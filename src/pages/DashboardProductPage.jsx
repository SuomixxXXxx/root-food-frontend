import { useState, useEffect } from "react";
import DashboardProductCard from "../components/DashboardProductCard";
import {
  Button,
  Typography,
  Input,
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDishItemsByCategory,
  addProductData,
} from "../redux/slices/dishItem";
import SideBarWorker from "../components/SideBarWorker";
import Modal from "../components/Modal";
import uploadImage from "../assets/images/uploadImage.png";
import { fetchCategories } from "../redux/slices/categories";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { IMAGE_URL } from "../constants";
import { useForm } from "react-hook-form";

export default function DashboardProductPage() {
  const [isHasRight, setIsHasRight] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categoryDishes = useSelector((state) => state.dishItems);
  const categories = useSelector((state) => state.categories);
  const [product, setProduct] = useState({
    name: "",
    weight: "",
    price: "",
    category: "",
  });
  const [open, setOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);
  const [image, setImage] = useState(null);
  const [view, setView] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    formState: { errors, isValid, touchedFields },
  } = useForm({
    mode: "all",
    defaultValues: {
      name: "",
      weight: "",
      price: "",
      category: "",
    },
  });
  const handleOpenCategories = () => {
    if (!categories || categories.length === 0) {
      dispatch(fetchCategories());
    }
    setOpenCategories((prev) => !prev);
  };

  const handleCategorySelect = (categoryId, categoryName) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      category: categoryId,
    }));
    setSelectedCategoryName(categoryName);
    setOpenCategories(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    handleDeleteProductData();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setView(reader.result);
      };
      reader.readAsDataURL(file);
    }
    event.target.value = null;
  };

  const handleSaveChanges = async () => {
    const formData = {
      name: product.name,
      weight: product.weight,
      price: product.price,
      "categoryDTO.id": product.category,
      file: image,
    };
    console.log(formData);

    const response = await dispatch(addProductData(formData)).unwrap();
    setOpen(false);
    if (response.status === 200) {
      params.id = product.category;
      reset();
      clearErrors();
      navigate(`/dashboard/category/${params.id}`);
    }
    handleDeleteProductData();
  };

  const handleDeleteProductData = () => {
    setProduct({
      name: "",
      weight: "",
      price: "",
      category: "",
    });
    setImage(null);
    setView(null);
    setSelectedCategoryName("");
  };

  useEffect(() => {
  dispatch(fetchDishItemsByCategory(params.id));
    if (localStorage.getItem("role") === "admin") {
      setIsHasRight(true);
    }
  }, [params.id, dispatch, open]);

  return (
    <div className="flex flex-col bg-blue-gray-100 pb-5 pt-5 md:flex-row min-h-screen">
      <div className="hidden md:flex basis-1/4 mt-14 md:ml-10">
        <SideBarWorker />
      </div>
      {isHasRight && (
        <div className="absolute right-4 top-4">
          <Button color="yellow" onClick={handleOpenModal}>
            Добавить блюдо
          </Button>
        </div>
      )}
      <div>
        <div className="grid grid-cols-2 place-items-center gap-4 md:grid-cols-3 mt-14 3xl:grid-cols-4">
          {categoryDishes.dishItems.items?.data?.map((product) => (
            <DashboardProductCard
              id={product.id}
              key={product.id}
              name={product.name}
              weight={product.weight}
              price={product.price}
              quantity={product.quantity}
              isAdmin={isHasRight}
              imageUrl={`${IMAGE_URL}/dishes/${product.id}.jpg`}
              categories={product.categoryDTO.name}
            />
          ))}
        </div>
      </div>
      <Modal open={open} onClose={handleCloseModal}>
        <Typography variant="h5" color="black" className="mb-4">
          Добавление товара
        </Typography>
        <div className="flex flex-col items-center mb-6">
          <input
            type="file"
            id="imageUpload"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
          <label htmlFor="imageUpload">
            <img
              src={view || uploadImage}
              alt="product"
              className="object-contain h-48 w-48 cursor-pointer"
            />
          </label>
        </div>

        <form onSubmit={handleSubmit(handleSaveChanges)}>
          <div className="flex flex-col space-y-2">
            <Input
              type="text"
              name="name"
              value={product.name}
              label="Название"
              error={Boolean(errors.name) && touchedFields.name}
              {...register("name", { required: "Укажите название" })}
              onChange={handleChange}
            />
            {errors.name && touchedFields.name && (
              <Typography type="small" color="red" className="mt-1 block">
                {errors.name.message}
              </Typography>
            )}

            <Input
              type="text"
              name="weight"
              value={product.weight}
              label="Вес"
              error={Boolean(errors.weight) && touchedFields.weight}
              {...register("weight", {
                required: "Укажите вес",
                pattern: {
                  value: /^[0-9]+(\.[0-9]{1,2})?$/,
                  message: "Вес должен быть числом",
                },
                min: {
                  value: 1,
                  message: "Вес должен быть больше нуля",
                },
              })}
              onChange={handleChange}
            />
            {errors.weight && touchedFields.weight && (
              <Typography type="small" color="red" className="mt-1 block">
                {errors.weight.message}
              </Typography>
            )}

            <Input
              type="text"
              name="price"
              value={product.price}
              label="Цена"
              error={Boolean(errors.price) && touchedFields.price}
              {...register("price", {
                required: "Укажите цену",
                pattern: {
                  value: /^[0-9]+(\.[0-9]{1,2})?$/,
                  message: "Цена должна быть числом",
                },
                min: {
                  value: 1,
                  message: "Цена должна быть больше нуля",
                },
              })}
              onChange={handleChange}
            />
            {errors.price && touchedFields.price && (
              <Typography type="small" color="red" className="mt-1 block">
                {errors.price.message}
              </Typography>
            )}

            <div>
              <Accordion
                open={openCategories}
                icon={
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-4 w-4 transition-transform ${
                      openCategories ? "rotate-180" : ""
                    }`}
                  />
                }
              >
                <AccordionHeader onClick={handleOpenCategories} className="p-3">
                  <Typography
                    color="blue-gray"
                    className="font-normal"
                    error={Boolean(errors.category?.message)}
                  >
                    {selectedCategoryName || "Категория"}
                  </Typography>
                </AccordionHeader>
                {openCategories && (
                  <AccordionBody className="py-1">
                    <ul className="p-0">
                      {categories.categories.items.data?.map((items) => (
                        <li
                          key={items.id}
                          className="flex items-center pl-6 cursor-pointer hover:bg-blue-100 transition-all duration-200 rounded-lg"
                          onClick={() => {
                            handleCategorySelect(items.id, items.name);
                            setValue("category", items.id);
                          }}
                        >
                          <Typography className="text-base font-medium text-blue-gray-700">
                            {items.name}
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  </AccordionBody>
                )}
              </Accordion>
              {errors.category && (
                <Typography type="small" color="red" className="mt-1 block">
                  {errors.category.message}
                </Typography>
              )}
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <Button color="green" disabled={!isValid} type="submit">
              Сохранить
            </Button>
            <Button color="blue" onClick={handleCloseModal}>
              Закрыть
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
