import { createSlice } from "@reduxjs/toolkit"; 
import { Client } from "@stomp/stompjs";
import axios from "../../axios";

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
      const exists = state.orders.some(order => order.id === newOrder.id); 
      if (!exists) {
        state.orders.unshift(newOrder);
      }
    },
    clearOrders: (state) => {
      state.orders = [];
    },
  },
});

export const { setOrders, addOrder, clearOrders } = orderSlice.actions;

let stompClient;

export const connectWebSocket = () => (dispatch) => {
  if (stompClient && stompClient.active) {
    console.log("WebSocket уже подключен.");
    return;
  }

  stompClient = new Client({
    brokerURL: "ws://localhost:8080/order",
    onConnect: () => {
      console.log("WebSocket подключен.");

      stompClient.subscribe("/ordersub/active-orders", (message) => {
        const orders = JSON.parse(message.body).body; 
        console.log("Новые заказы получены через WebSocket:", orders);
        orders.forEach((order) => {
          dispatch(addOrder(order)); 
        });
      });

      stompClient.publish({ destination: "/orders/getActiveOrders" });
    },

    onStompError: (frame) => {
      console.error("Ошибка WebSocket:", frame.headers["message"]);
    },
    onWebSocketClose: () => {
    },
    debug: (str) => console.log(str),
    reconnectDelay: 5000,
  });

  stompClient.activate();
};

export const fetchOrders = () => async (dispatch) => {
  try {
    const response = await axios.get("/orders/getActiveOrders");
    dispatch(setOrders(response.data));
  } catch (error) {
    console.error("Ошибка при получении заказов:", error);
  }
};

export const disconnectWebSocket = () => (dispatch) => {
  if (stompClient && stompClient.active) {
    stompClient.deactivate();
    console.log("WebSocket отключен.");
    dispatch(clearOrders()); 
  }
};

export default orderSlice.reducer;
