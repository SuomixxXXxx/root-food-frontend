import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectWebSocket, disconnectWebSocket } from "../redux/slices/order";
import DashboardOrderCard from "../components/DashboardOrderCard";
import SideBarWorker from "../components/SideBarWorker";

export default function DashboardOrderPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connectWebSocket());
    return () => {
      dispatch(disconnectWebSocket());
    };
  }, [dispatch]);

  const orders = useSelector((state) => state.order.orders);
  console.log("Текущие заказы:", orders);

  return (
    <div className="flex flex-col bg-blue-gray-100 pb-5 pt-5 md:flex-row min-h-screen">
      <div className="hidden md:flex basis-1/4 mt-14 md:ml-10">
        <SideBarWorker />
      </div>
      <div className="flex-grow">
        <div className="grid grid-cols-2 place-items-center gap-4 md:grid-cols-3 mt-14 3xl:grid-cols-4">
          {orders.map((order) => (
            <DashboardOrderCard
              key={order.id}
              orderNumber={order.id}
              items={order.orderContentDTOs}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
