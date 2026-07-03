
import React, { useEffect, useState } from "react";

import Sidebar from "../../components/userDashboard/Sidebar";
import Overview from "../../components/userDashboard/Overview";
import Order from "../../components/userDashboard/Order";
import Settings from "../../components/userDashboard/Settings";
import Wishlist from "../../components/userDashboard/Wishlist";

const UserDashboard = () => {
  const [active, setActive] = useState("Overview");

  return (
    <>
      <div className="flex h-[92vh]">
        <div className="w-1/6 border border-red-500 h-full">
          <Sidebar active={active} setActive={setActive} />
        </div>
        <div className="w-5/6 border border-green-500 h-full">
          {active === "Overview" && <Overview />}
          {active === "Order" && <Order />}
          {active === "Wishlist" && <Wishlist />}
          {active === "Settings" && <Settings />}
        </div>
      </div>
    </>
  );
};

export default UserDashboard;