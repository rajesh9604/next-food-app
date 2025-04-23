"use client";
import { useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import UserLogin from "../_components/UserLogin";
import USerSignUp from "../_components/USerSignUp";

const UserAuth = (props) => {
  const [login,setLogin] = useState(true)
  console.log(props)
  return (
    <div>
      <CustomerHeader />
      <div className="container">
        <h1>{login? "User Login":"User Signup"}</h1>
        {
          login ?<UserLogin redirect={props.searchParams}/>:<USerSignUp redirect={props.searchParams}/>

        }    
        <button className="button-link" onClick={()=>setLogin(!login)}>
        {login ? "Do not have account? signup": "Already have account? login"}
        </button>    
      </div>

      <Footer />
    </div>
  );
};
export default UserAuth;
