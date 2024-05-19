// import "./App.css";
// import Profile from "./Components/Profile/Profile";
// import Login from "./Components/Login/Login";
// import Layout from "./layout"; // Import your Layout component
// import Register from "./Components/Register/Register";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState } from "react";
// import AddGroceryPage from "./Components/Grocery/add-grocery";
// import Userspecificgrocery from "./Components/Grocery/View_User_Grocery";
// import ShowAllBids from "./Components/Bids/Specific_Bids";
// import { UserProvider } from "./Components/UserContext.js";
// import AllGrocery from "./Components/Grocery/grocery";


// import UserBids from "./Components/Bids/user_bids"
// import TitleBar from "./Components/TitleBar/titlebar";

// function App() {
//   const [userstate, setUserState] = useState({});
//   const [userProfile, setUserProfile] = useState(null); // Initial value for userProfile
//   const [token, setToken] = useState(""); // Initial value for token
//   const App = () => {
//     const [key, setKey] = useState(0);
  
//     const handleLogout = () => {
//       // Perform logout actions
  
//       // Increment the key to force remounting of the TitleBar component
//       setKey(key + 1);
//     };
//   }
  
//   return (
//     <div className="App">
//       <UserProvider value={{ userProfile, setUserProfile, token, setToken }}>
//         <Router>
//           <Layout> {/* Wrap your routes with the Layout component */}
//             <Routes>
//               <Route
//                 path="/"
//                 element={
//                   userstate && userstate._id ? (
//                     <Profile
//                       setUserState={setUserState}
//                       username={userstate.fname}
//                     />
//                   ) : (
//                     <Login setUserState={setUserState} />
//                   )
//                 }
//               ></Route>
//               <Route
//                 path="/login"
//                 element={<Login setUserState={setUserState} />}
//               ></Route>
//               <Route path="/all-grocery" element={<AllGrocery />} />
//               <Route
//                 path="/add-grocery"
//                 element={<AddGroceryPage />}
//               ></Route>
//               <Route
//                 path="/user-grocery"
//                 element={<Userspecificgrocery />}
//               ></Route>
//               <Route path="/UserBids" element={<UserBids />} />
//               <Route path="/ShowAllBids" element={<ShowAllBids />} />
//               <Route path="/signup" element={<Register />}></Route>
//             </Routes>
//           </Layout>
//         </Router>
//       </UserProvider>
//     </div>
//   );
// }

// export default App;
import "./App.css";
import Profile from "./Components/Profile/Profile.js";
import Login from "./Components/Login/Login.js";
import Layout from "./layout"; // Import your Layout component
import Register from "./Components/Register/Register.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import AddGroceryPage from "./Components/Grocery/add-grocery.js";
import Userspecificgrocery from "./Components/Grocery/View_User_Grocery.js";
import ShowAllBids from "./Components/Bids/Specific_Bids";
import { UserProvider } from "./Components/UserContext.js";
import AllGrocery from "./Components/Grocery/grocery.js";
import UserBids from "./Components/Bids/user_bids.js";
import TitleBar from "./Components/TitleBar/titlebar.js";

function App() {
  const [userstate, setUserState] = useState({});
  const [userProfile, setUserProfile] = useState(null); // Initial value for userProfile
  const [token, setToken] = useState(""); // Initial value for token
  const [key, setKey] = useState(0); // Key for remounting TitleBar component

  const handleLogout = () => {
    // Perform logout actions

    // Increment the key to force remounting of the TitleBar component
    setKey(key + 1);
  };

  return (
    <div className="App">
      <UserProvider value={{ userProfile, setUserProfile, token, setToken }}>
        <Router basename="/groceries_react_project">

          <Layout> {/* Wrap your routes with the Layout component */}
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
              <Route
                path="/add-grocery"
                element={<AddGroceryPage />}
              ></Route>
              <Route
                path="/user-grocery"
                element={<Userspecificgrocery />}
              ></Route>
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
