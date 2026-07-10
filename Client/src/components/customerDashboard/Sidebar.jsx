import React from "react";
import { MdOutlineDashboard, MdOutlineFastfood } from "react-icons/md";
import { PiListHeartLight } from "react-icons/pi";
import { BsPersonGear } from "react-icons/bs";

const MenuItems = [
  { name: "overview", label: "Overview", icon: <MdOutlineDashboard /> },
  { name: "orders", label: "Orders", icon: <MdOutlineFastfood /> },
  { name: "wishlist", label: "Wishlist", icon: <PiListHeartLight /> },
  { name: "settings", label: "Settings", icon: <BsPersonGear /> },
];

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <>
      <div className="p-3">
        <div className="border-b-2 text-center text-xl">User Dashboard</div>

        <div className="space-y-1 p-4 mt-4">
          {MenuItems.map((item, idx) => (
            <button
              key={idx}
              className={`flex gap-3 font-semibold items-center border border-transparent hover:border-(--primary) w-full p-3 rounded-lg ${activeTab===item.name && "bg-(--secondary) text-(--primary-text)"}`}
              onClick={() => setActiveTab(item.name)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;