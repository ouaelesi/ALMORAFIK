import React from "react";

const LogIn = () => {
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
        <div className="login_form">
          <div className="form-group Loginstitles" id="usernamelogin">
            Email
            <input
              className="form-control Loginstitles mb-4"
              placeholder=".."
            ></input>
            Password
            <input className="form-control mb-4" placeholder=".."></input>
            <button className="btn loginbtn">LOG IN</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
