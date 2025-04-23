"use client";
import { useEffect, useState } from "react";
import DeliveryHeader from "../DeliveryHeader";
import { useRouter } from "next/navigation";

const Page = () => {
  const [loginMobile, setLoginMobile] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [name, setName] = useState("");

  const [password, setPassword] = useState("");
  const [c_password, setC_password] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");

  const router = useRouter();

  useEffect(()=>{
    const delivery= JSON.parse(localStorage.getItem('delivery'))
    if(delivery){
      router.push('/deliverydashboard')
    }
  },[])

  const handleSignUp = async () => {
    console.log(name, contact, password, c_password, city, address);
    let response = await fetch(
      "http://localhost:3000/api/deliverypartners/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          contact,
          password,
          city,
          address,
          contact,
        }),
      }
    );
    response = await response.json();
    if (response.success) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("delivery", JSON.stringify(result));
      router.push("/deliverydashboard");
    } else {
      alert("failed");
    }
  };
  const loginHandle = async () => {
    console.log(loginMobile, loginPassword);
    let response = await fetch(
      "http://localhost:3000/api/deliverypartners/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile: loginMobile, password: loginPassword }),
      }
    );
    response = await response.json();
    if (response.success) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("delivery", JSON.stringify(result));
      router.push("/deliverydashboard");
    } else {
      alert("failed to login. Please try again with valid mobile and password");
    }
  };
  return (
    <div>
      <DeliveryHeader />
      <h1>Delevry Partner</h1>
      <div className="auth-container">
        <div className="login-wrapper">
          <h3>Login</h3>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="enter mobile no"
              className="input-field"
              value={loginMobile}
              onChange={(e) => setLoginMobile(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <input
              type="password"
              placeholder="enter password"
              className="input-field"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <button className="button" onClick={loginHandle}>
              Login
            </button>
          </div>
        </div>
        <div className="signup-wrapper">
          <h3>Signup</h3>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Enter name"
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Enter contact"
              className="input-field"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <input
              type="password"
              placeholder="Enter password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <input
              type="password"
              placeholder="Enter c_password"
              className="input-field"
              value={c_password}
              onChange={(e) => setC_password(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Enter city"
              className="input-field"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Enter address"
              className="input-field"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <button className="button" onClick={handleSignUp}>
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
