import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Typography, Button, Textarea } from "@material-tailwind/react";

export default function HelpPage() {
  const [result, setResult] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setResult("Отправка....");
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const subject = `${data.name} отправил сообщение на Root Food`;
    formData.append("subject", subject);
    formData.append("access_key", "03ceb16a-21a9-4d5f-8934-6acbe13f7541");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const dataResponse = await response.json();

    if (dataResponse.success) {
      setResult("Форма успешно отправлена!");
    } else {
      console.log("Error", dataResponse);
      setResult(dataResponse.message);
    }
  };

  return (
    <div className="h-screen bg-light-blue flex justify-center items-center">
      <div className="card w-96 mt-16">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-center">Обратная связь</h2>
          </div>

          <input
            type="hidden"
            {...register("from_name")}
            defaultValue="Root Food"
          />

          <div className="flex flex-col w-full mb-4">
            <Input
              type="text"
              label="Ваше имя"
              color="blue"
              error={Boolean(errors.name?.message)}
              {...register("name", { required: "Введите имя" })}
              className="border border-[#475569] rounded"
            />
            <Typography variant="small" color="red" className="mt-1 block">
              {errors.name?.message}
            </Typography>
          </div>

          <div className="flex flex-col w-full mb-4">
            <Input
              type="email"
              label="Email"
              color="blue"
              error={Boolean(errors.email?.message)}
              {...register("email", {
                required: "Введите email",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Невалидный ввод email",
                },
              })}
              className="border border-[#475569] rounded"
            />
            <Typography variant="small" color="red" className="mt-1 block">
              {errors.email?.message}
            </Typography>
          </div>

          <div className="flex flex-col w-full mb-4">
            <Input
              type="tel"
              label="Телефон"
              color="blue"
              error={Boolean(errors.phone?.message)}
              {...register("phone", {
                required: "Введите телефон",
                pattern: {
                  value: /^\+7\d{10}$/,
                  message: "Формат ввода: +71234567890",
                },
              })}
              className="border border-[#475569] rounded"
            />
            <Typography variant="small" color="red" className="mt-1 block">
              {errors.phone?.message}
            </Typography>
          </div>

          <div className="flex flex-col w-full mb-4">
            <Textarea
              label="Ваше сообщение"
              color="blue"
              error={Boolean(errors.message?.message)}
              {...register("message", {
                required: "Введите сообщение",
                minLength: {
                  value: 8,
                  message: "Сообщение должно иметь минимум 8 символов",
                },
              })}
              className="rounded-lg"
            />
            <Typography variant="small" color="red" className="mt-1 block">
              {errors.message?.message}
            </Typography>
          </div>
          <Button
            type="submit"
            className="w-full bg-base-blue shadow-none hover:shadow-none normal-case text-base"
          >
            Отправить
          </Button>

          {result && (
            <Typography
              variant="small"
              className="text-center text-sm text-gray-600 mt-4"
            >
              {result}
            </Typography>
          )}
        </form>
      </div>
    </div>
  );
}
