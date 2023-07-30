import React from "react";

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
  const data = await getInventoryDashboardData();
  console.log(data);
  return (
    <>
      {/* {data?.map((item: any, index: number) => (
        <div key={`${item.product}`}>{item.products}</div>
      ))} */}
    </>
  );
};

export default Inventory;
