import React, { useState, useEffect } from "react";
import basestyle from "../Base.module.css";
import loginstyle from "./Login.module.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
const Login = ({ setUserState }) => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    login_id: "",
    password: "",
  });
  const [userData, setUserData] = useState(null)

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };
  const validateForm = (values) => {
    const error = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.login_id) {
      error.login_id = "Email is required";
    } else if (!regex.test(values.email)) {
      error.login_id = "Please enter a valid email address";
    }
    if (!values.password) {
      error.password = "Password is required";
    }
    return error;
  };
  const headers= axios.interceptors.request.use(function (config) {
    const token = "Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH" ;
    config.headers.api_key =  token;

    return config;
});
  const loginHandler = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    setIsSubmit(true);
      axios.post("https://lobster-app-ddwng.ondigitalocean.app/user/login",user,
       headers).then((res) => {
        setUserData(res.data.message);
        localStorage.setItem("token",res.data.message.token);
        navigate("/");
      });
   
  };

  return (
    <div className={loginstyle.login}>
      <form>
        <h1 className="heading">Login</h1>
        <p className="sub-heading">Enter email and password</p>
        <input
          type="email"
          name="login_id"
          id="email"
          placeholder="Email"
          onChange={changeHandler}
          value={user.login_id}
        />
        <p className={basestyle.error}>{formErrors.email}</p>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={changeHandler}
          value={user.password}
        />
        <p className={basestyle.error}>{formErrors.password}</p>
        <button className={basestyle.button_common} onClick={loginHandler}>
          Login
        </button>
      </form>
      <NavLink to="/signup">Not yet registered? Register Now</NavLink>
    </div>
  );
};
export default Login;
