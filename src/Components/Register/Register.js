import React, { useEffect, useState } from "react";
import basestyle from "../Base.module.css";
import registerstyle from "./Register.module.css";
import axios from "axios";

import { useNavigate, NavLink } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    full_name: "",
    uname: "",
    email_id: "",
    password: "",
    mobile_number: "",
    country_row_id:"",
    referralId:"",
  });

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
    if (!values.full_name) {
      error.full_name = "First Name is required";
    }
    if (!values.uname) {
      error.uname = "Last Name is required";
    }
    if (!values.email_id) {
      error.email_id = "email_id is required";
    } else if (!regex.test(values.email_id)) {
      error.email_id = "This is not a valid email_id format!";
    }
    if (!values.password) {
      error.password = "Password is required";
    } else if (values.password.length < 4) {
      error.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      error.password = "Password cannot exceed more than 10 characters";
    }
    // if (!values.cpassword) {
    //   error.cpassword = "Confirm Password is required";
    // } else if (values.cpassword !== values.password) {
    //   error.cpassword = "Confirm password and password should be same";
    // }
    return error;
  };
  const signupHandler = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    setIsSubmit(true);
    // if (!formErrors) {
    //   setIsSubmit(true);
    // }
  };

 const headers= axios.interceptors.request.use(function (config) {
    const token = "Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH" ;
    config.headers.api_key =  token;

    return config;
});

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(user);
      axios.post(" https://lobster-app-ddwng.ondigitalocean.app/user/register", headers, user).then((res) => {
        console.log("++++++++++++IN signup",res)
        // alert(res.data.message);
        // navigate("/login", { replace: true });
      });
    }
  }, [formErrors]);
  return (
    <>
      <div className={registerstyle.register}>
        <form>
          <h1>Create your account</h1>
          <h6 className="register">Create your profile</h6>
          <input
            type="text"
            name="full_name"
            id="full_name"
            placeholder="Full Name"
            onChange={changeHandler}
            value={user.full_name}
          />
          <p className={basestyle.error}>{formErrors.full_name}</p>
          <input
            type="text"
            name="uname"
            id="uname"
            placeholder="User Name"
            onChange={changeHandler}
            value={user.uname}
          />
          <input
            type="text"
            name="country_row_id"
            id="country_row_id"
            placeholder="Select country_row_id"
            onChange={changeHandler}
            value={user.country_row_id}
          />
          <p className={basestyle.error}>{formErrors.uname}</p>
          <input
            type="email_id"
            name="email_id"
            id="email_id"
            placeholder="email_id"
            onChange={changeHandler}
            value={user.email_id}
          />
          <p className={basestyle.error}>{formErrors.email_id}</p>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={changeHandler}
            value={user.password}
          />
          <p className={basestyle.error}>{formErrors.password}</p>
          <input
            type="text"
            name="mobile_number"
            id="mobile_number"
            placeholder="Mobile Number"
            onChange={changeHandler}
            value={user.mobile_number}
          />
          <input
            type="text"
            name="referralId"
            id="referralId"
            placeholder="Referral Id"
            onChange={changeHandler}
            value={user.referralId}
          />
          <p className={basestyle.error}>{formErrors.cpassword}</p>
          <button className={basestyle.button_common} onClick={signupHandler}>
            Register
          </button>
        </form>
        <NavLink to="/login">Already registered? Login</NavLink>
      </div>
    </>
  );
};
export default Register;
