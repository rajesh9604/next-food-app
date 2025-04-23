import { useRouter } from "next/navigation";
import { useState } from "react";

const UserLogin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router =useRouter()
  console.log("login",props);
  const loginHandle=async()=>{
    console.log(email,password);
    let response = await fetch("http://localhost:3000/api/user/login",{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
          },
        body:JSON.stringify({ email, password})
    })
    response= await response.json()
    if(response.success){   
        const {result} =response
        delete result.password
        localStorage.setItem("user",JSON.stringify(result))
        if(props?.redirect?.order){
            console.log("login if");
            
            router.push("/order")
        }else{
            console.log("login else");
            
            router.push("/")
        }
    }else{
        alert("failed to login. Please try again with valid email and password")
    }
    
  }
  return (
    <div>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="enter email"
          className="input-field"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
      </div>
      <div className="input-wrapper">
        <input
          type="password"
          placeholder="enter password"
          className="input-field"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
      </div>
      <div className="input-wrapper">
        <button className="button" onClick={loginHandle}>Login</button>
      </div>
    </div>
  );
};
export default UserLogin;
