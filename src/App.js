import "./App.css";
import Profile from "./Components/Profile/Profile";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import { Routes, Route } from "react-router-dom";
import { useState,useEffect } from "react";

function App() {
  const [userstate, setUserState] = useState({});
  const [savedData, setSavedData] = useState(null)
  useEffect(()=>{
    console.log("+++++++++",savedData)
  },[])
  
  return (
    <div className="App">
        <Routes>
          <Route
            path="/"
            element={
            
                <Profile
                  savedData={savedData}
                />
            }
          ></Route>
          <Route
            path="/login"
            element={<Login />}
          ></Route>
          <Route path="/signup" element={<Register setSavedData={setSavedData}/>}></Route>
        </Routes>
    </div>
  );
}

export default App;
