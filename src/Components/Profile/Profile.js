import React from "react";
import basestyle from "../Base.module.css";
import { useNavigate, NavLink } from "react-router-dom";
const Profile = ({savedData }) => {
  const navigate = useNavigate()
  const token=localStorage.getItem("token")
  return (
   <>
   { token  ? <div className="profile">
      <h1 style={{ color: "white" }}>Welcome {savedData.username} !!</h1>
      <table className="table table-bordered table-dark">
  <thead>
    <tr>
      <th scope="col">user_id</th>
      <th scope="col">Full Name</th>
      <th scope="col">User Name</th>
      <th scope="col">Country Code</th>
      <th scope="col">Email Id</th>
      <th scope="col">Mobile Number</th>
      <th scope="col">Referral Id</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <th scope="row">{savedData._id}</th>
      <td>{savedData.full_name}</td>
      <td>{savedData.username}</td>
      <td>{savedData.country_row_id}</td>
      <td>{savedData.email_id}</td>
      <td>{savedData.mobile_number}</td>
      <td>{savedData.referral_row_id}</td>
    </tr>
  </tbody>
</table>

   <button
        className={basestyle.button_common}
        onClick={()=> navigate('/login')}
      >
        Logout
      </button>
    </div> : <div><h3 className="text-white">You must login first</h3>
      <button className={basestyle.button_common} onClick={()=> navigate('/login')} >Logout</button>
    </div> }
  </>
  );
};
export default Profile;
