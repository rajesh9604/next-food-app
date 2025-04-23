import { useRouter } from "next/navigation";
import { useState } from "react";

const USerSignUp = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setC_password] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const router = useRouter()
  
  
  const handleSignUp = async() => {
    console.log(name, email, password, c_password, city, address, contact);
    let response = await fetch("http://localhost:3000/api/user",{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
          },
        body:JSON.stringify({name, email, password, city, address, contact})
    })
    response= await response.json()
    if(response.success){   
        const {result} =response
        delete result.password
        localStorage.setItem("user",JSON.stringify(result))
        if(props?.redirect?.order){
            router.push("/order")
        }else{

            router.push("/")
        }
    }else{
        alert("failed")
    }
  };

  return (
    <div>
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
          placeholder="Enter email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <input
          type="text"
          placeholder="Enter contact"
          className="input-field"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
      </div>
      <div className="input-wrapper">
        <button className="button" onClick={handleSignUp}>
          Signup
        </button>
      </div>
    </div>
  );
};
export default USerSignUp;
