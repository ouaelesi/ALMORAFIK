import React, { useState } from 'react';
import { useRouter } from 'next/router';

const SignUP = () => {
  const router = useRouter() ; 

  const handleSubmit =(e)=>{ 
    signUp(); 
    alert('done'); 
  }
  const handleChange =(e)=>{
     setUser({...newUser,[e.target.name] : e.target.value  })
  }
  const signUp = async ()=>{
    const res = await fetch('http://localhost:3000/api/users' , {
      method : 'POST' , 
      headers : {
        "Accept" : "application/json" , 
        "Content-Type" : "application/json"
      } , body : JSON.stringify(newUser)
    })
   if(res.status === 200 ){  
     router.push("/")
   }
  }
  const [newUser , setUser] = useState({
    userName : "" , 
    hashPassword :'' , 
    email : "" , 
    // profilPic : "none"
  })
  return (
    <div>
      <div className="login_container">
          <button className=" btn login_with_google">
            <img src="/assets/imgs/google_logo.png"></img> Login with Google
          </button>

          <button className=" btn login_with_facebook">
            <img src="/assets/imgs/fb_logo.png" width="8px"></img> Login with
            Facebook
          </button>
          <form className="login_form" onSubmit={handleSubmit}>
            <div className="form-group Loginstitles" id="usernamelogin">
              User Name
              <input
                className="form-control Loginstitles"
                placeholder=".."
                name="userName"
                onChange={handleChange}
              ></input>
              Email
              <input
                className="form-control Loginstitles"
                placeholder=".."
                name="email"
                onChange={handleChange}
              ></input>
              Password
              <input
                className="form-control"
                placeholder=".."
                onChange={handleChange}
                name="hashPassword"
                type="password"
              ></input>
              <button className="btn singinbtn" type='submit'>SIGN IN</button>
            </div>
          </form>
        </div>
    </div>
  );
};

export default SignUP;
