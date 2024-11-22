import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { orderCreate, clearCart } from "../redux/slices/cart";
import { selectIsAuth } from "../redux/slices/auth.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "./Modal.jsx";
export default function PaymentBox() {
  const [open, setOpen] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state) => state.cart);
  const isAuth = useSelector(selectIsAuth);
  // const navigate = useNavigate();

  const handleClose = async () => {
    setOpen(false);
    setOrderMessage("");
    dispatch(clearCart());
  };

  const handlePurchase = async () => {
    if (!isAuth) {
      setOpen(true);
      setOrderMessage("Пожалуйста, авторизуйтесь для оформления заказа");
      // alert("Пожалуйста, авторизуйтесь для оформления заказа");
      // navigate("/login");
      return;
    }
    const orderContentDTOs = items.map((item) => ({
      dishItemDTO: { id: item.id },
      quantity: item.quantity,
    }));

    try {
      const response = await dispatch(
        orderCreate({ orderContentDTOs })
      ).unwrap();
      if (response.status === 200) {
        const successMessage = `Заказ успешно оформлен! Код заказа: ${response.data.id}`;
        setOrderMessage(successMessage);
        setOpen(true);
        console.log(orderMessage);
        console.log(open);
        // alert(`${successMessage}`);
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        // dispatch(clearCart());
      }
    } catch (error) {
      setOrderMessage(
        "Ошибка при оформлении заказа. Пожалуйста, попробуйте снова."
      );
      setOpen(true);
      console.error("Ошибка при оформлении заказа:", error);
    }
  };
  return (
    <div className="w-40 md:w-60">
      <div className="flex md:justify-center md:items-center">
        <Typography color="black" className="mb-2 text-xl md:text-2xl">
          Оплата
        </Typography>
      </div>
      <Typography color="black" className="mb-1 text-base md:text-xl">
        Способ оплаты
      </Typography>
      <Typography color="black" className="mb-1 text-base md:text-xl">
        Сбербанк
      </Typography>
      <Typography color="black" className="mb-5 text-base md:text-xl">
        Итого: <span className="text-green-800 text-xl md:text-2xl">{totalPrice} ₽</span>
      </Typography>
      <Button
        className="w-full normal-case md:text-lg bg-base-blue shadow-light-blue shadow-sm hover:shadow-light-blue rounded-2xl"
        onClick={handlePurchase}
      >
        Оплатить
      </Button>
      <Modal open={open} onClose={isAuth ? handleClose : () => setOpen(false)}>
        <Typography variant="h5" color="black">
          {orderMessage}
        </Typography>
      </Modal>
    </div>
  );
}
