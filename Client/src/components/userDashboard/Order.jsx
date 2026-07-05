import React from "react";
import {
  MdRestaurant,
  MdAccessTime,
  MdCheckCircle,
} from "react-icons/md";

const Order = () => {
  const orders = [
    {
      id: "ORD-1001",
      restaurant: "Pizza Hut",
      items: "1x Margherita Pizza, 1x Coke",
      total: "₹499",
      date: "05 Jul 2026, 11:30 AM",
      status: "Delivered",
    },
    {
      id: "ORD-1002",
      restaurant: "Burger King",
      items: "2x Whopper Burger, 1x Fries",
      total: "₹699",
      date: "03 Jul 2026, 08:15 PM",
      status: "Delivered",
    },
    {
      id: "ORD-1003",
      restaurant: "Biryani House",
      items: "1x Chicken Biryani",
      total: "₹299",
      date: "01 Jul 2026, 02:45 PM",
      status: "Preparing",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-linear-to-r from-orange-500 to-red-500 p-6 rounded-3xl text-white shadow-lg">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <p className="text-orange-100 mt-2">
          Track and manage your recent food orders
        </p>
      </div>

      {/* Orders */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl shadow-md border p-5 hover:shadow-lg transition"
          >
            <div className="flex flex-col md:flex-row justify-between gap-4">
              
              {/* Left */}
              <div className="space-y-2">
                <span className="text-xs text-gray-400 font-semibold">
                  {order.id}
                </span>

                <div className="flex items-center gap-2">
                  <MdRestaurant className="text-orange-500" />
                  <h2 className="text-lg font-bold text-gray-800">
                    {order.restaurant}
                  </h2>
                </div>

                <p className="text-gray-500 text-sm">
                  {order.items}
                </p>

                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <MdAccessTime />
                  {order.date}
                </div>
              </div>

              {/* Right */}
              <div className="flex flex-col items-end justify-between">
                <h3 className="text-2xl font-bold text-gray-800">
                  {order.total}
                </h3>

                <span
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  <MdCheckCircle />
                  {order.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State Example */}
      {orders.length === 0 && (
        <div className="bg-white rounded-2xl p-10 shadow text-center">
          <h2 className="text-2xl font-bold text-gray-700">
            No Orders Found
          </h2>
          <p className="text-gray-500 mt-2">
            You haven't placed any orders yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default Order;