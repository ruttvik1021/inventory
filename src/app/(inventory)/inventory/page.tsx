"use client";
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
      qwertyuiop
      {/* {data?.map((item: any, index: number) => (
        <div key={`${item.product}`}>{item.products}</div>
      ))} */}
    </>
  );
};

export default Inventory;
