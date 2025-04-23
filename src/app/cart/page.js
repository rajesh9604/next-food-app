"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { DELEVERY_CHARGE, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";

const Page = () => {
  const [cartStorage, setCartStorage] = useState([]);
  const [total, setTotal] = useState(0);
  const router =useRouter()

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartStorage(storedCart);

    const calculatedTotal =
      storedCart.length === 1
        ? storedCart[0].price
        : storedCart.reduce((a, b) => a + b.price, 0);

    setTotal(calculatedTotal);
  }, []);

  console.log(cartStorage);
  const orderNow =()=>{
    if(JSON.parse(localStorage.getItem("user"))){

      router.push("/order")
    }else{
      router.push("/user-auth?order=true")
    }
  }
  return (
    <div>
      <CustomerHeader />
      <div className="food-item-wrapper">
        {cartStorage.length > 0 ? (
          cartStorage.map((item) => (
            <div className="list-item" key={item._id}>
              <div className="list-item-block-1">
                <img style={{ width: 100 }} src={item.img_path} />
              </div>
              <div className="list-item-block-2">
                <div>{item.name}</div>
                <div className="description">{item.description}</div>
                <button onClick={() => removeFromCart(item._id)}>
                  Remove from cart
                </button>
              </div>
              <div className="list-item-block-3">
                Price :<span>&#8377;{item.price}</span>
              </div>
            </div>
          ))
        ) : (
          <h1>No food item added</h1>
        )}
      </div>
      <div className="total-wrapper">
        <div className="block-1">
          <div className="row">
            <span>Food charges</span>
            <span>&#8377;{total}</span>
          </div>
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
        </div>
        <div className="block-2">
          <button onClick={orderNow}>Order Now</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Page;
