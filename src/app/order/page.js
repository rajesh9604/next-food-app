"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { DELEVERY_CHARGE, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";

const Page = () => {
  const [cartStorage, setCartStorage] = useState([]);
  const [total, setTotal] = useState(0);
  const [userStorage, setUserStorage] = useState([]);
  const [removeCartData,setRemoveCartData]= useState(false)
  const router= useRouter()
  useEffect(() => {
    const storedUserCart = JSON.parse(localStorage.getItem("user")) || [];
    setUserStorage(storedUserCart);
  }, []);
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!storedCart || storedCart.length === 0) {
        alert("Your cart is empty! Redirecting to home.");
        router.push("/");
        return;
      }
    setCartStorage(storedCart);

    const calculatedTotal =
      storedCart.length === 1
        ? storedCart[0].price
        : storedCart.reduce((sum, item) => sum + item.price, 0);

    setTotal(calculatedTotal);
  }, []);

  const orderNow =async()=>{
    let user_Id= JSON.parse(localStorage.getItem("user"))._id; 
    let city= JSON.parse(localStorage.getItem("user")).city;
    let cart =JSON.parse(localStorage.getItem("cart"))
    let foodItemIds=cart.map((item)=>item._id).toString()
    let deliveryBoyResponse = await fetch("http://localhost:3000/api/deliverypartners/"+city)
    deliveryBoyResponse =await deliveryBoyResponse.json()
    let deleveryBoyIds =deliveryBoyResponse.result.map((item => item._id))
    let deleveryBoy_id=deleveryBoyIds[Math.floor(Math.random()* deleveryBoyIds.length)]
    console.log(deleveryBoy_id);
    if(!deleveryBoy_id){
      alert("delivery not available")
      return false
    }
    
    let resto_id= cart[0].resto_id
    let collection={
        user_Id,
        resto_id,
        foodItemIds,
        deleveryBoy_id,
        status:"confirm",
        amount: total + DELEVERY_CHARGE + (total * TAX) / 100
    }
    let response =await fetch("http://localhost:3000/api/order",{
        method:"POST",
        headers: {
            "Content-Type": "application/json" 
          },
        body:JSON.stringify(collection)
    })
    response=await response.json()
    if(response.success){
        alert("Order confirmed")
        setRemoveCartData(true)
        router.push("/myprofile")
    }else{
        alert("Order Failed")
    }
    console.log(collection);
    
  }
  

  return (
    <div>
      <CustomerHeader removeCartData={removeCartData}/>

      <div className="total-wrapper">
        <div className="block-1">
          <h2>User Details</h2>
          <div className="row">
            <span>Name</span>
            <span>{userStorage.name}</span>
          </div>
          <div className="row">
            <span>Address</span>
            <span>{userStorage.address}</span>
          </div>
          <div className="row">
            <span>Mobile No</span>
            <span>{userStorage.contact}</span>
          </div>
          <h2>Amount Details</h2>
          <div className="row">
            <span>Tax</span>
            <span>&#8377;{(total * TAX) / 100}</span>
          </div>
          <div className="row">
            <span>Delevery charges :</span>
            <span>&#8377;{DELEVERY_CHARGE}</span>
          </div>
          <div className="row">
            <span>Total Amount :</span>
            <span>&#8377;{total + DELEVERY_CHARGE + (total * TAX) / 100}</span>
          </div>
          <h2>Payment method</h2>
          <div className="row">
            <span>Cash on delevery :</span>
            <span>&#8377;{total + DELEVERY_CHARGE + (total * TAX) / 100}</span>
          </div>
        </div>
        <div className="block-2">
          <button onClick={orderNow}>Place Your Order Now</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Page;
