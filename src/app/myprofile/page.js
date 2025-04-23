"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";

const Page = () => {
  const [myOrders, setMyOrders] = useState([]);
  const userStorage =JSON.parse(localStorage.getItem('user'))
  useEffect(() => {
    getMyOrders();
  }, []);
  const getMyOrders = async () => {
    let response = await fetch(
      "http://localhost:3000/api/order?id="+userStorage._id
    );
    response = await response.json();
    if (response.success) {
      setMyOrders(response.result);
    }
  };
  console.log(myOrders);
  

  return (
    <div>
      <CustomerHeader />
      {myOrders &&
        myOrders.map((item) => (
          <div key={item.data._id} className="restaurant-wrapper" style={{margin:'auto'}}>
            <h4>Name :{item.data.name}</h4>
            <div>Amount :{item.amount}</div>
            <div>Address :{item.data.address}</div>
            <div>Status :{item.status}</div>
          </div>
        ))}
      <Footer />
    </div>
  );
};
export default Page;
