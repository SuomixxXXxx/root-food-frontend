import { createSlice } from "@reduxjs/toolkit";
import { Client } from "@stomp/stompjs";
import axios from "../../axios";
import { WS_URL } from "../../constants";

export const completeOrder = (orderId) => async (dispatch) => {
  try {
    await axios.patch("/order/complete", null, { params: { id: orderId } });
    dispatch(removeOrder(orderId));
  } catch (error) {
    console.error("Ошибка при завершении заказа:", error);
  }
};

const initialState = {
  orders: [],
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    addOrder: (state, action) => {
      const newOrder = action.payload;
      const exists = state.orders.some((order) => order.id === newOrder.id);
      if (!exists) {
        state.orders.unshift(newOrder);
      }
    },
    removeOrder: (state, action) => {
      const orderId = action.payload;
      state.orders = state.orders.filter((order) => order.id !== orderId);
    },
    clearOrders: (state) => {
      state.orders = [];
    },
  },
});

let stomp;

export const connectWebSocket = () => (dispatch) => {
  if (stomp && stomp.active) {
    console.log("WebSocket уже подключен.");
    return;
  }

  stomp = new Client({
    brokerURL: `${WS_URL}/order`,
    onConnect: () => {
      console.log("WebSocket подключен.");

      stomp.subscribe("/ordersub/active-orders", (message) => {
        const orders = JSON.parse(message.body).body;
        console.log("Получены активные заказы через WebSocket:", orders);
        dispatch(setOrders(orders));
      });

      stomp.publish({ destination: "/orders/getActiveOrders" });
    },
    onStompError: (frame) => {
      console.error("Ошибка WebSocket:", frame.headers["message"]);
    },
    onWebSocketClose: () => {},
    // debug: (str) => console.log(str),
    // reconnectDelay: 5000,
  });
  stomp.activate();
};

export const disconnectWebSocket = () => (dispatch) => {
  if (stomp && stomp.active) {
    stomp.deactivate();
    console.log("WebSocket отключен.");
    dispatch(clearOrders());
  }
};

export const { setOrders, addOrder, removeOrder, clearOrders } =
  orderSlice.actions;

export const orderReducer = orderSlice.reducer;
