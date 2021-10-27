import React, { Component } from "react";

class LoginForm extends React.Component {
  render() {
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
          <div className="login_form">
            <div className="form-group Loginstitles" id="usernamelogin">
              User Name
              <input
                className="form-control Loginstitles"
                placeholder=".."
              ></input>
              Email
              <input
                className="form-control Loginstitles"
                placeholder=".."
              ></input>
              Password
              <input className="form-control" placeholder=".."></input>
              <button className="btn singinbtn">SIGN IN</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
