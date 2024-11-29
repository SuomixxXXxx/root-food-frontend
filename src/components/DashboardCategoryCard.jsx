import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCategory } from "../redux/slices/categories";
import { PencilIcon } from "@heroicons/react/24/outline";
import Modal from "../components/Modal";
import { Input, Button, Typography } from "@material-tailwind/react";

export default function DashboardCategoryCard({ id, name, imageUrl }) {
  console.log("url:", imageUrl);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState({
    name: name || "",
  });
  const [imagePrew, setImagePrew] = useState(imageUrl || "");
  const [imagePreviewModal, setImagePreviewModal] = useState(imageUrl || "");
  const [imageFile, setImageFile] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm({
    mode: "all",
    defaultValues: {
      name: name || "",
    },
  });

  const handleOpenModal = () => {
    setOpen(true);

    setCategory({
      name,
    });
    setImagePreviewModal(imageUrl);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setCategory({
      name: "",
    });
    setImagePreviewModal(imageUrl);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
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

  const updateCategoryData = async () => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", category.name);
    console.log(formData);

    if (imageFile) {
      formData.append("file", imageFile);
      console.log(imageFile);
    }

    try {
      const response = await dispatch(updateCategory(formData));
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
  }, [isUpdated]);

  return (
    <div className="relative w-full h-32 md:w-64 md:h-48 shadow-none rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
      <Link to={`/dashboard/category/${id}`}>
        <div className="relative h-full w-full">
          <img
            src={imagePrew || imageUrl}
            alt={category.name}
            className="object-cover h-full w-full"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-75 transition-opacity duration-300">
            <h5 className="text-white text-base md:text-2xl font-bold text-center">
              {category.name}
            </h5>
          </div>
        </div>
      </Link>
      <div
        className="absolute top-2 right-2 p-2 bg-white rounded-full cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          handleOpenModal();
        }}
      >
        <PencilIcon className="h-6 w-6 text-gray-800" />
      </div>

      <Modal open={open} onClose={handleCloseModal}>
        <Typography variant="h5" color="black" className="mb-4">
            Изменение категории
        </Typography>
        <div className="flex justify-center items-center h-56 mb-4">
          <input
            type="file"
            id={'imageUpload-${id}'}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <label htmlFor={'imageUpload-${id}'}>
            <img
              src={imagePreviewModal}
              alt="category"
              className="object-contain h-32 w-32 cursor-pointer"
            />
          </label>
        </div>
        <form onSubmit={handleSubmit(updateCategoryData)}>
          <div className="flex flex-col space-y-3">
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
              <Typography type="small" color="red" className="mt-0.5 block">
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
