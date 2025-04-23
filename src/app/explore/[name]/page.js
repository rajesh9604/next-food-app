"use client";
import CustomerHeader from "@/app/_components/CustomerHeader";
import Footer from "@/app/_components/Footer";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const params = useParams();
  const name = params.name;
  const searchParams = useSearchParams();
  const [restaurantsDetails, setRestaurantsDetails] = useState();
  const [foodItems, setFoodItems] = useState([]);
  const [cartData, setCartData] = useState();
  const [cartStorage, setCartStorage] = useState(() =>
    JSON.parse(
      (typeof window !== "undefined" && localStorage.getItem("cart")) || "[]"
    )
  );

  const [cartIds, setCartIds] = useState(
    () =>
      cartStorage?.map((item) => {
        return item._id;
      }) || []
  );
  const [removeCartData,setRemoveCartData]= useState()

  useEffect(() => {
    loadRestaurantsDetails();
  }, []);

  console.log(cartIds);

  const loadRestaurantsDetails = async () => {
    const id = searchParams.get("id");
    let response = await fetch("http://localhost:3000/api/customer/" + id);
    response = await response.json();
    if (response.success) {
      setRestaurantsDetails(response.details);
      setFoodItems(response.foodItems);
    }
  };
  const addToCart = (item) => {
    setCartData(item);
    let localCartIds = cartIds;
    localCartIds.push(item._id)
    setCartIds(localCartIds)
    setRemoveCartData()
  };
  const removeFromCart =(id)=>{
    setRemoveCartData(id)
    const localIds = cartIds.filter(item=> item!= id)
    setCartData()
    setCartIds(localIds)
  }
  return (
    <div>
      <CustomerHeader cartData={cartData} removeCartData={removeCartData} />
      <div className="restaurant-page-banner">
        <h1>{decodeURI(name)}</h1>
      </div>
      <div className="detail-wrapper">
        <h4>Contact: {restaurantsDetails?.contact}</h4>
        <h4>City: {restaurantsDetails?.city}</h4>
        <h4>Address: {restaurantsDetails?.address}</h4>
        <h4>Email: {restaurantsDetails?.email}</h4>
      </div>
      <div className="food-item-wrapper">
        {foodItems.length > 0 ? (
          foodItems.map((item) => (
            <div className="list-item" key={item.id}>
              <div>
                <img style={{ width: 100 }} src={item.img_path} />
              </div>
              <div>
                <div>{item.name}</div>
                <div>{item.price}</div>
                <div className="description">{item.description}</div>
                {cartIds && cartIds.includes(item._id) ? (
                  <button onClick={()=>removeFromCart(item._id)}>Remove from cart</button>
                ) : (
                  <button onClick={() => addToCart(item)}>Add to cart</button>
                )}
              </div>
            </div>
          ))
        ) : (
          <h1>No food item added</h1>
        )}
      </div>
      <Footer />
    </div>
  );
};
export default Page;
