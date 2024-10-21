import DashboarOrderCard from "../components/DashboardOrderCard";
import SideBarWorker from "../components/SideBarWorker";


const orders = [
  {
    orderNumber: 70,
    items: [
      { name: 'Картошка', count: 1 },

    ]
  },
  {
    orderNumber: 69,
    items: [
      { name: 'Котлета', count: 3 },
      { name: 'Макароны', count: 2 },
      { name: 'Котлета', count: 3 },
      { name: 'Макароны', count: 2 },
      { name: 'Котлета', count: 3 },
      { name: 'Макароны', count: 2 },
      { name: 'Котлета', count: 3 },
      { name: 'Макароны', count: 2 },
      { name: 'Котлета', count: 3 },
      { name: 'Макароны', count: 2 },
      { name: 'Котлета', count: 3 },
      { name: 'Макароны', count: 2 }

    ]
  },
  {
    orderNumber: 70,
    items: [
      { name: 'Картошка', count: 1 },

    ]
  },
  {
    orderNumber: 69,
    items: [
      { name: 'Котлета', count: 3 },
      { name: 'Макароны', count: 2 },
      { name: 'Котлета', count: 3 },
      { name: 'Макароны', count: 2 },
      { name: 'Котлета', count: 3 },
      { name: 'Макароны', count: 2 },
      { name: 'Котлета', count: 3 },
      { name: 'Макароны', count: 2 },
      { name: 'Котлета', count: 3 },
      { name: 'Макароны', count: 2 },
      { name: 'Котлета', count: 3 },
      { name: 'Макароны', count: 2 }

    ]
  },
  {
    orderNumber: 70,
    items: [
      { name: 'Картошка', count: 1 },

    ]
  },
  {
    orderNumber: 69,
    items: [
      { name: 'Котлета', count: 3 },
      { name: 'Макароны', count: 2 },
      { name: 'Котлета', count: 3 },
      { name: 'Макароны', count: 2 },
      { name: 'Котлета', count: 3 },
      { name: 'Макароны', count: 2 },
      { name: 'Котлета', count: 3 },
      { name: 'Макароны', count: 2 },
      { name: 'Котлета', count: 3 },
      { name: 'Макароны', count: 2 },
      { name: 'Котлета', count: 3 },
      { name: 'Макароны', count: 2 }

    ]
  }
];

export default function DashboardOrderPage() {
  return (
    <div className="flex flex-col bg-blue-gray-100  pb-5 pt-5 md:flex-row min-h-screen ">
      <div className="hidden md:flex basis-1/4 mt-14  md:ml-10">
        <SideBarWorker />
      </div>
      <div >
        <div className="grid grid-cols-2 place-items-center gap-4  md:grid-cols-3 mt-14 3xl:grid-cols-4">
          {orders.map(order => (
            <DashboarOrderCard
              key={order.orderNumber}
              orderNumber={order.orderNumber}
              items={order.items}
            />
          ))}
        </div>
      </div>
    </div>
  );

}