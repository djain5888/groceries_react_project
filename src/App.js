import "./App.css";
import Profile from "./Components/Profile/Profile";
import Login from "./Components/Login/Login";
import Layout from "./layout";
import Register from "./Components/Register/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import AddGroceryPage from "./Components/Grocery/add-grocery";
import Userspecificgrocery from "./Components/Grocery/View_User_Grocery";
import ShowAllBids from "./Components/Bids/Specific_Bids";
import { UserProvider } from "./Components/UserContext.js";
import AllGrocery from "./Components/Grocery/grocery";
import UserBids from "./Components/Bids/user_bids";
import TitleBar from "./Components/TitleBar/titlebar";

function App() {
  const [userstate, setUserState] = useState({}); // Initial state: no user
  const [userProfile, setUserProfile] = useState(null); // Initial value for userProfile
  const [token, setToken] = useState(""); // Initial value for token
  const [key, setKey] = useState(0); // Key for remounting TitleBar component

  useEffect(() => {
    // Handle any initial setup here, if needed
  }, []);

  const handleLogout = () => {
    // Perform logout actions
    setUserState({}); // Reset user state on logout
    setKey(key + 1); // Increment the key to force remounting of the TitleBar component
  };

  return (
    <div className="App">
      <UserProvider value={{ userProfile, setUserProfile, token, setToken }}>
        <Router basename="/groceries_react_project">
          <Layout>
            <Routes>
              <Route
                path="/"
                element={
                  userstate && userstate._id ? (
                    <Profile
                      setUserState={setUserState}
                      username={userstate.fname}
                    />
                  ) : (
                    <Login setUserState={setUserState} />
                  )
                }
              ></Route>
              <Route
                path="/login"
                element={<Login setUserState={setUserState} />}
              ></Route>
              <Route path="/all-grocery" element={<AllGrocery />} />
              <Route path="/add-grocery" element={<AddGroceryPage />} />
              <Route path="/user-grocery" element={<Userspecificgrocery />} />
              <Route path="/UserBids" element={<UserBids />} />
              <Route path="/ShowAllBids" element={<ShowAllBids />} />
              <Route path="/signup" element={<Register />}></Route>
            </Routes>
          </Layout>
          <TitleBar key={key} onLogout={handleLogout} /> {/* Add key prop */}
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
