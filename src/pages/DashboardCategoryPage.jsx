import DashboardCategoryCard from "../components/DashboardCategoryCard";
import SideBarWorker from "../components/SideBarWorker";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react"
import { fetchCategories } from "../redux/slices/categories";
import {
    Button,
    Typography,
    Input,
  } from "@material-tailwind/react";
  import { useParams, useNavigate } from "react-router-dom";
  import {addCategoryData} from "../redux/slices/categories";
  import Modal from "../components/Modal";
  import uploadImage from "../assets/images/uploadImage.png";
  import { IMAGE_URL } from "../constants";
  import {useForm } from "react-hook-form";

export default function DashboardCategoryPage() {
    const [isHasRight] = useState(true);
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories);
    const [category, setCategory] = useState({
        name: "",
      });
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [view, setView] = useState(null);
  
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors, isValid, touchedFields },
  } = useForm({
    mode: "all",
    defaultValues: {
      name: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    handleDeleteCategoryData();
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
      name: category.name,
      file: image,
    };
    console.log(formData);

    const response = await dispatch(addCategoryData(formData)).unwrap();

    if (response.status === 200) {
      reset();
      clearErrors();
      setOpen(false);
      dispatch(fetchCategories());
      navigate("/dashboard/category");
    }

    handleDeleteCategoryData();
  };
  
  const handleDeleteCategoryData = () => {
    setCategory({
      name: "",
    });
    setImage(null);
    setView(null);
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/dashboard/category/${categoryId}`);
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [params.id, dispatch]);

  return (
    <div className="flex flex-col bg-blue-gray-100 pb-5 pt-5 md:flex-row min-h-screen">
      <div className="hidden md:flex basis-1/4 mt-14 md:ml-10">
        <SideBarWorker />
      </div>
      {isHasRight && (
        <div className="absolute right-4 top-4">
          <Button color="yellow" onClick={handleOpenModal}>
            Добавить категорию
          </Button>
        </div>
      )}
<div>
        <div className="grid grid-cols-2 place-items-center gap-4 md:grid-cols-3 mt-14 3xl:grid-cols-4">
          {categories.categories.items.data?.map((category, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(category.id)}
            >
              <DashboardCategoryCard
                key={category.id}
                id={category.id}
                name={category.name}
                isAdmin={isHasRight}
                imageUrl={`${IMAGE_URL}/categories/${category.id}.jpg`}
              />
            </div>
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
              alt="category"
              className="object-contain h-48 w-48 cursor-pointer"
            />
          </label>
        </div>

        <form onSubmit={handleSubmit(handleSaveChanges)}>
          <div className="flex flex-col space-y-2">
            <Input
              type="text"
              name="name"
              value={category.name}
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
