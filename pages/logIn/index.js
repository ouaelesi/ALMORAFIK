import React ,{useState} from "react";

const LogIn = () => {
  const [userInfo , setUserInfo] = useState({email : '' , hashPassword : ''})
  const handleSubmit = (e)=>{
    alert(userInfo.email)
    const res = fetch('http://localhost:3000/api/users/logIn' , 
    {
      method : 'POST' , 
      headers : {
        "Accept" : "application/json" , 
        "Content-Type" : "application/json"
      } , body : JSON.stringify(userInfo)
    })
    alert('doone')
  }
  const handleChange =(e)=>{
    setUserInfo({
      ...userInfo , 
      [e.target.name] : e.target.value
    })
  }
  return (
    <div className="page_container row d-flex justify-content-center">
      <div className="login_container col-10 col-xl-3 col-lg-4 col-md-5 col-sm-8">
        <button className=" btn login_with_google">
          <img src="/assets/imgs/google_logo.png"></img> Login with Google
        </button>

        <button className=" btn login_with_facebook">
          <img src="/assets/imgs/fb_logo.png" width="8px"></img> Login with
          Facebook
        </button>
        <form className="login_form" onSubmit={handleSubmit}>
          <div className="form-group Loginstitles" id="usernamelogin">
            Email
            <input
              className="form-control Loginstitles mb-4"
              placeholder=".."
              name="email"
              onChange={handleChange}
            ></input>
            Password
            <input
              className="form-control mb-4"
              placeholder=".."
              name="hashPassword"
              onChange={handleChange}
            ></input>
            <button className="btn loginbtn" type="submit">
              LOG IN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
