import React, { Component } from 'react';
import LoginSteps from '../../partials/LoginSteps'
import LoginForm from '../../partials/SignUP'

class SignUp extends React.Component {
    render() {
        return (
            <div className="page_container row">
                <div className="col-12 col-md-6 d-flex justify-content-center"><LoginSteps></LoginSteps></div>
                <div className="col-12 col-md-6 d-flex justify-content-center"> <LoginForm></LoginForm></div>
            </div>
        );
    }
}

export default SignUp;