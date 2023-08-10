// "use client";
import InventoryNavbar from "@/components/inventoryNavbar";
import React from "react";
// import { useSession, getSession } from "next-auth/react";

const getInventoryDashboardData = async () => {
  //   const { status, body } = await getInventoryData();
  const status = 200;
  const body = [
    {
      products: "Breaks",
    },
  ];
  if (status > 199 || status < 299) {
    return body;
  }
};

const Inventory = async () => {
  // const { data: session, status } = useSession();
  // console.log("session", {
  //   session,
  //   status,
  // });
  const data1 = await getInventoryDashboardData();
  console.log(data1);
  return (
    <>
      <InventoryNavbar />
      <div className="columns-3xs ...">
        <img className="w-full aspect-video ..." src="..." />
        <img className="w-full aspect-square ..." src="..." />
      </div>
    </>
  );
};

export default Inventory;
