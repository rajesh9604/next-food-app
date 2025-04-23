"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const RestaurantHeader = () => {
  const [details, setDetails] = useState("");
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    let data = localStorage.getItem("restaurantUser");
    if (!data && pathName == "/restaurant/dashboard") {
      router.push("/restaurant");
    } else if (data && pathName == "/restaurant") {
      router.push("/restaurant/dashboard");
    } if (data) {
      setDetails(JSON.parse(data));
    }
    else{
      setDetails(null)
    }
  }, [pathName]);
  const logout = () => {
    localStorage.removeItem("restaurantUser")
    setDetails(null)
    router.push("/restaurant");
  };
  return (
    <div className="header-wrapper">
      <div className="logo">
        <img
          src="/food-delivery.png"
          alt="food-delivery-app-logo"
          style={{ width: 100 }}
        />
      </div>
      <ul className="header-wrapper">
        <li>
          <Link href="/">Home</Link>
        </li>
        {details && details.name ? (
          <>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
            <li>
              <Link href="/restaurant/profile">Profile</Link>
            </li>
          </>
        ) : (
          <li>
            <Link href="/">Login/SignUp</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default RestaurantHeader;
