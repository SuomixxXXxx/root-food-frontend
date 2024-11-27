import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Input,
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { updateDishItem } from "../redux/slices/dishItem";
import Modal from "./Modal";
import { fetchCategories } from "../redux/slices/categories";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { deleteDishItemById } from "../redux/slices/dishItem";

export default function DashboardProductCard({
  id,
  name,
  weight,
  price,
  quantity,
  imageUrl,
  isAdmin,
  categories,
}) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [product, setProduct] = useState({
    name: name || "",
    weight: weight || "",
    price: price || "",
    quantity: quantity || "",
  });
  const [imagePrew, setImagePrew] = useState(imageUrl || "");
  const [imagePreviewModal, setImagePreviewModal] = useState(imageUrl || "");
  const [imageFile, setImageFile] = useState(null);
  const category = useSelector((state) => state.categories);
  const [categoryProduct, setCategoryProduct] = useState("");
  const [openCategoties, setOpenCategoties] = useState(false);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, touchedFields },
  } = useForm({
    mode: "all",
    defaultValues: {
      name: name || "",
      weight: weight || "",
      price: price || "",
      quantity: quantity || "",
    },
  });

  const handleOpenModal = () => {
    setOpen(true);

    setProduct({
      name,
      weight,
      price,
      quantity,
    });
    setImagePreviewModal(imageUrl);
    setCategoryProduct("");
    setSelectedCategoryName("");
  };

  const handleCloseModal = () => {
    setOpen(false);
    setProduct({
      name: "",
      weight: "",
      price: "",
      quantity: "",
    });
    setImagePreviewModal(imageUrl);
    setCategoryProduct("");
    setSelectedCategoryName("");
  };

  const handleOpenModalDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);
  const handleDeleteDishItem = async () => {
    const response = await dispatch(deleteDishItemById(id)).unwrap();
    setOpenDelete(false);
    if (response.status == 200) {
      setIsDeleted(true);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  const handleOpenCategories = () => {
    if (!category || category.length === 0) {
      dispatch(fetchCategories());
    }
    setOpenCategoties((prev) => !prev);
  };

  const handleCategorySelect = (categoryId, categoryName) => {
    setCategoryProduct(categoryId);
    setSelectedCategoryName(categoryName);
    setOpenCategoties(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewModal(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateDish = async () => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("weight", product.weight);
    formData.append("quantity", product.quantity);
    formData.append("categoryDTO.id", categoryProduct);
    console.log(formData);

    if (imageFile) {
      formData.append("file", imageFile);
      console.log(imageFile);
    }

    try {
      const response = await dispatch(updateDishItem(formData));
      console.log(response);
      if (response.payload) {
        setIsUpdated(true);
        setImagePrew(imagePreviewModal);
      }
    } catch (error) {
      console.error("Ошибка при обновлении:", error);
    }
  };

  useEffect(() => {
    if (isUpdated) {
      setOpen(false);
      window.location.reload();
    }
    if (isDeleted) {
      window.location.reload();
    }
  }, [isUpdated, isDeleted]);

  return (
    <div>
      <Card className="flex flex-col h-auto w-60 md:w-80 bg-white shadow-lg p-4">
        <CardHeader
          floated={false}
          className="flex justify-center items-center h-56 mb-4"
        >
          <div className="flex justify-center items-center h-full w-full overflow-hidden">
            <img
              src={imagePrew || imageUrl}
              alt="product"
              className="object-contain h-full w-full"
            />
          </div>
        </CardHeader>
        <CardBody className="text-center">
          <Typography
            variant="h4"
            color="blue-gray"
            className="mb-2 text-lg md:text-xl"
          >
            {name}
          </Typography>
          <div className="space-y-1 text-left">
            <Typography
              color="blue-gray"
              className="font-medium text-left mb-2 text-sm md:text-base"
            >
              Вес: {weight} г
            </Typography>
            <Typography
              color="blue-gray"
              className="font-medium text-left mb-2 text-sm md:text-base"
            >
              Цена: {price} ₽
            </Typography>
            <Typography
              color="blue-gray"
              className="font-medium text-left mb-2 text-sm md:text-base"
            >
              Количество: {quantity}
            </Typography>
          </div>
          <div className="w-full flex flex-col items-center space-y-2">
            {isAdmin ? (
              <div className="flex flex-col items-center space-y-2 mt-4">
                <Button
                  color="green"
                  size="sm"
                  className="w-40"
                  onClick={handleOpenModal}
                >
                  Изменить товар
                </Button>
                <div>
                  <Button
                    color="red"
                    size="sm"
                    className="w-40"
                    onClick={handleOpenModalDelete}
                  >
                    Удалить товар
                  </Button>
                  <Modal open={openDelete} onClose={handleCloseDelete}>
                    <div className="p-6">
                      <Typography variant="h5" color="black">
                        Вы действительно хотите удалить товар{" "}
                        <span className="font-bold">{name}</span>?
                      </Typography>
                      <div className="flex justify-between mt-4">
                        <Button
                          onClick={handleDeleteDishItem}
                          color="red"
                          variant="filled"
                        >
                          Да, удалить
                        </Button>
                        <Button
                          onClick={handleCloseDelete}
                          color="blue"
                          variant="filled"
                        >
                          Отмена
                        </Button>
                      </div>
                    </div>
                  </Modal>
                </div>
              </div>
            ) : (
              <Button
                color="green"
                size="sm"
                className="w-full"
                onClick={handleOpenModal}
              >
                Изменить товар
              </Button>
            )}
          </div>
        </CardBody>
      </Card>

      <Modal open={open} onClose={handleCloseModal}>
        <Typography variant="h5" color="black" className="mb-4">
          Изменение карточки товара
        </Typography>
        <div className="flex justify-center items-center h-56 mb-4">
          <input
            type="file"
            id={`imageUpload-${id}`}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <label htmlFor={`imageUpload-${id}`}>
            <img
              src={imagePreviewModal}
              alt="product"
              className="object-contain h-48 w-48 cursor-pointer"
            />
          </label>
        </div>
        <form onSubmit={handleSubmit(updateDish)}>
        <div className="flex flex-col space-y-3">
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
              <Typography type="small" color="red" className="mt-0.5 block">
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
              <Typography type="small" color="red" className="mt-0.5 block">
                {errors.weight.message}
              </Typography>
            )}
          <Input
            {...register("price", {
              required: "Цена обязательна",
              validate: (value) => value > 0 || "Цена должна быть больше нуля",
            })}
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
              <Typography type="small" color="red" className="mt-0.5 block">
                {errors.price.message}
              </Typography>
          )}
          <Input
            {...register("quantity", {
              required: "Количество обязательно",
              validate: (value) =>
                value > 0 || "Кол-во должно быть больше нуля",
            })}
            type="text"
            name="quantity"
            value={product.quantity}
            label="Количество"
            error={Boolean(errors.quantity) && touchedFields.quantity}
            {...register("quantity", {
              required: "Укажите кол-во",
              pattern: {
                value: /^[0-9]+(\.[0-9]{1,2})?$/,
                message: "Кол-во должна быть числом",
              },
              min: {
                value: 1,
                message: "Кол-во должно быть больше нуля",
              },
            })}
            onChange={handleChange}
          />
          {errors.quantity && touchedFields.quantity && (
              <Typography type="small" color="red" className="mt-0.5 block">
                {errors.quantity.message}
              </Typography>
          )}
          <div>
            <Accordion
              open={openCategoties}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    openCategoties ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <AccordionHeader onClick={handleOpenCategories} className="p-3">
                <Typography color="blue-gray" className="font-normal">
                  {selectedCategoryName ? selectedCategoryName : categories}
                </Typography>
              </AccordionHeader>
              {openCategoties && (
                <AccordionBody className="py-1">
                  <ul className="p-0">
                    {category.categories.items.data?.map((items) => (
                      <li
                        key={items.id}
                        className="flex items-center pl-6 cursor-pointer hover:bg-blue-100 transition-all duration-200 rounded-lg"
                        onClick={() =>{
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
