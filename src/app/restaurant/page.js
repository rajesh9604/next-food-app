"use client"
import { useState } from "react";
import RestaurantHeader from "../_components/RestaurantHeader";
import RestaurantLogin from "../_components/Restaurantlogin";
import RestaurantSignUp from "../_components/RestaurantSignUp";
import Footer from "../_components/Footer";
import './style.css'
const Restaurant = () => {
    const [login, setLogin] = useState(true);
    return (
      <>
        <div className="container">
          <RestaurantHeader />
          <h1>Restaurant page</h1>
          {login ? <RestaurantLogin /> : <RestaurantSignUp />}
          <div>
            <button onClick={() => setLogin(!login)} className="button-link">
              {login
                ? "Do not have account ? signUp"
                : "Already have account ? Login"}
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  };
  export default Restaurant;
  