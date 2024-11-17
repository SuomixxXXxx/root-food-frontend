import { useState } from "react";
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
import { updateDishItem, uploadImagePost } from "../redux/slices/dishItem";
import Modal from "./Modal";
import { fetchCategories } from "../redux/slices/categories";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
export default function DashboardProductCard({
  id,
  name,
  weight,
  price,
  imageUrl,
  isAdmin,
  categories,
}) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [nameProduct, setNameProduct] = useState(name || "");
  const [weightProduct, setWeightProduct] = useState(weight || "");
  const [priceProduct, setPriceProduct] = useState(price || "");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const category = useSelector((state) => state.categories);
  // const cat = useSelector((state) => state.categories);
  // const categoriesCat = cat.categories.items.data;
  const [categoryProduct, setCategoryProduct] = useState("");
  const [openCategoties, setOpenCategoties] = useState(false);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  

  const handleOpenCategories = () => {
    if (!category || category.length === 0) {
      dispatch(fetchCategories());
      console.log(category, "категории ");
    }
    setOpenCategoties((prev) => !prev);
  };

  const handleCategorySelect = (categoryId, categoryName) => {
    console.log(categoryId, "bob");
    setCategoryProduct(categoryId);
    setSelectedCategoryName(categoryName);
    console.log(categoryProduct);
    setOpenCategoties(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // const createFileFromImage = async (imageUrl) => {
  //   try {
  //     const response = await fetch(imageUrl); // Загружаем изображение
  //     const blob = await response.blob(); // Преобразуем в Blob
  //     const file = new File([blob], "food-background-images-3.jpg", {
  //       type: blob.type, // Определяем тип MIME
  //     });
  //     return file; // Возвращаем объект File
  //   } catch (error) {
  //     console.error("Ошибка при создании файла из изображения:", error);
  //   }
  // };

  const updateDish = async () => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", nameProduct);
    formData.append("price", priceProduct);
    formData.append("weight", weightProduct);
    formData.append("categoryDTO.id", categoryProduct);

    if (imageFile) {
      formData.append("file", imageFile);
      console.log(imageFile) // Отправляем файл, если он обновился
    }

    try {
      console.log(formData);
      const response = await dispatch(updateDishItem(formData));
      console.log(response);
      if (response.payload) {
        setImage(response.payload.imageUrl);  
      }
    } catch (error) {
      console.error("Ошибка при обновлении:", error);
    }
  };

  return (
    <div>
      <Card className="flex flex-col h-auto w-60 md:w-80 bg-white shadow-lg p-4">
        <CardHeader
          floated={false}
          className="flex justify-center items-center h-56 mb-4"
        >
          <div className="flex justify-center items-center h-full w-full overflow-hidden">
            <img
              src={image || imageUrl}
              alt="product"
              className="object-contain h-full w-full"
              onClick={updateDish}
            />
          </div>
        </CardHeader>
        <CardBody className="text-center">
          <Typography
            variant="h4"
            color="blue-gray"
            className="mb-2 text-lg md:text-xl"
            // onClick={updateDish}
          >
            {name}
          </Typography>
          <Typography
            color="blue-gray"
            className="font-medium text-left mb-2 text-sm md:text-base"
          >
            Вес: {weight} г
          </Typography>
          <Typography
            color="blue-gray"
            className="font-medium text-left text-sm md:text-base mb-4"
          >
            Цена: {price} ₽
          </Typography>
          <div className="w-full flex flex-col items-center space-y-2">
            {isAdmin ? (
              <div className="flex flex-col items-center space-y-2">
                <Button
                  color="green"
                  size="sm"
                  className="w-full"
                  onClick={handleOpenModal}
                >
                  Изменить товар
                </Button>
                <Button color="red" size="sm" className="w-full">
                  Удалить товар
                </Button>
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
            id="imageUpload"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <label htmlFor="imageUpload">
            <img
              src={image || imageUrl}
              alt="product"
              className="object-contain h-48 w-48 cursor-pointer"
            />
          </label>
        </div>
        <div className="flex flex-col space-y-6">
          <Input
            type="text"
            value={nameProduct}
            onChange={(e) => setNameProduct(e.target.value)}
            placeholder="Название"
            className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
          />
          <Input
            type="number"
            value={weightProduct}
            onChange={(e) => setWeightProduct(e.target.value)}
            placeholder="Вес"
            className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
          />
          <Input
            type="number"
            value={priceProduct}
            onChange={(e) => setPriceProduct(e.target.value)}
            placeholder="Цена"
            className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
          />
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
                        onClick={() =>
                          handleCategorySelect(items.id, items.name)
                        }
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
          <Button color="green" onClick={updateDish}>
            Сохранить
          </Button>
          <Button color="blue" onClick={handleCloseModal}>
            Закрыть
          </Button>
        </div>
      </Modal>
    </div>
  );
}
