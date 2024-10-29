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
    <div>
      <Card className="w-80 md:w-96 h-60">
        <CardBody className="pb-2">
          <Typography variant="h5" color="black" className="mb-2">
            Способ оплаты
          </Typography>
          <div className="flex flex-row">
            <Typography color="black">Сбербанк</Typography>
          </div>
          <Typography variant="h5" color="black" className="mb-2">
            Цена: {totalPrice} ₽
          </Typography>
          <div className="flex justify-center items-center h-full">
            <Button color="blue" onClick={handlePurchase}>
              Оплатить
            </Button>
          </div>
        </CardBody>
      </Card>
      <Modal open={open} onClose={isAuth ? handleClose : () => setOpen(false)}>
        <Typography variant="h5" color="black">
          {orderMessage}
        </Typography>
      </Modal>
    </div>
  );
}
