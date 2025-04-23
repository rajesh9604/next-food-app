"use client";
import { useEffect, useState } from "react";
import DeliveryHeader from "../DeliveryHeader";
import { useRouter } from "next/navigation";

const Page = () => {
  const [myOrders, setMyOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const delivery = JSON.parse(localStorage.getItem("delivery"));
    if (!delivery) {
      router.push("/deliverypartner");
    } else {
      getMyOrders(delivery._id);
    }
  }, []);

  const getMyOrders = async (deliveryId) => {
    let response = await fetch(
      "http://localhost:3000/api/deliverypartners/orders/" + deliveryId
    );
    response = await response.json();
    if (response.success) {
      setMyOrders(response.result);
    }
  };
console.log(myOrders)
  const handleStatusChange = async (orderId, newStatus) => {
    const res = await fetch(
      "http://localhost:3000/api/deliverypartners/orders/" + orderId,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      }
    );

    const data = await res.json();
    console.log(data);
    
    if (data.success) {
      // Update the local state to reflect the new status
      setMyOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } else {
      alert("Failed to update status");
    }
  };
  console.log(myOrders);
  
  return (
    <div>
      <DeliveryHeader />
      <h1>My Order List</h1>
      {myOrders &&
        myOrders.map((item) => (
          <div key={item.data._id} className="restaurant-wrapper">
            <h4>Name: {item.data.name}</h4>
            <div>Amount: {item.amount}</div>
            <div>Address: {item.data.address}</div>
            <div>Status: {item.status}</div>
            <div>
              Update Status:{" "}
              <select
                value={item.status}
                onChange={(e) =>
                  handleStatusChange(item._id, e.target.value)
                }
              >
                <option value="confirm">Confirm</option>
                <option value="on the way">On the way</option>
                <option value="delivered">Delivered</option>
                <option value="failed to deliver">Failed to deliver</option>
              </select>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Page;
