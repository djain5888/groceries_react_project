import React, { createContext, useState, useEffect, } from "react";
import axios from "axios";
import GroceriesList from "../Grocery/grocery";
import basestyle from "../Base.module.css";
import loginstyle from "./Login.module.css";
import { useNavigate, NavLink } from "react-router-dom";
import TitleBar from "../TitleBar/titlebar";
import { setAuthToken,setUserProfile,setTitle } from "../../Constants/Constant";


export const UserContext = createContext();

setTitle("Login")
window.dispatchEvent(new Event('titleChange'));

export const UserProvider = ({ children }) => {
  console.log("inside login")
  const [userProfile, setUserProfile] = useState(null);
  const [authToken, setAuthToken] = useState('');
  
  // return (
  //   <UserContext.Provider value={{ userProfile, setUserProfile, authToken, setAuthToken }}>
  //     {children}
  //   </UserContext.Provider>
  // );
};


const Login = ({ setUserState }) => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  // const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "Please enter a valid email address";
    }
    if (!values.password) {
      error.password = "Password is required";
    }
    return error;
  };

  
    // setIsLoading(true)
    const loginHandler = (e) => {
      e.preventDefault();
      const errors = validateForm(user);
      setFormErrors(errors);
    
      if (Object.keys(errors).length === 0) {
        setIsLoading(true); // Set loading state to true before the API call
        setIsSubmit(true);
    
        axios.post("https://groceries-i18z.onrender.com/api/auth/login", user)
          .then((res) => {
            setIsLoading(false); // Set loading state to false after successful response
            setUserState(res.data.user);
            setToken(res.data.token);
            const { name, email, id } = res.data;
            setAuthToken(res.data.token);

            // const newProfileData = {
            //   email: email,
            //   name: name,
            //   id: id,
            // };
          
            setUserProfile({ name, email, id });
            setLoggedIn(true);
            navigate("/all-grocery", { replace: true }); // Navigate after successful login
            // window.location.reload(); 
          })
          .catch((error) => {
            setIsLoading(false); // Set loading state to false after error
            console.error("Error:", error);
          });
      }
    
  };
  useEffect(() => {

    console.log("isLoading inside useEffect:", isLoading);
    if(isLoading)
    {
      
      console.log('loading the page ____')
    }
    else
    {
      console.log("not loading......")
    }
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      axios.post("https://groceries-i18z.onrender.com/api/auth/login", user)
        .then((res) => {
          // setIsLoading(false); // Set loading state to false
          setUserState(res.data.user);
          setToken(res.data.token);
          const { name, email, id } = res.data;
          setAuthToken(res.data.token)
          setUserProfile({ name, email, id });
          setLoggedIn(true);
          // window.location.reload();


        })
        .catch((error) => {
          // setIsLoading(false); // Set loading state to false
          console.error("Error:", error);
        });
    }
  }, [formErrors, isSubmit, user, setUserState, navigate,isLoading]);

  return (
    <UserContext.Provider value={{ setUserProfile, token, setToken }}>
      <div>
        {!loggedIn &&!isLoading && (
          <div className={loginstyle.login}>
            <form>
              <h1>Login</h1>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={changeHandler}
                value={user.email}
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
        )}
        {isLoading ? (
                  
                  <div className="preloader">
                    {console.log("loading icon",isLoading)}
                    {(
        <div className="preloader">
        <div className="preloader">
          <svg className="cart" role="img" aria-label="Shopping cart line animation" viewBox="0 0 128 128" width="128px" height="128px" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8">
              <g className="cart__track" stroke="hsla(0,10%,10%,0.1)">
                <polyline points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" />
                <circle cx="43" cy="111" r="13" />
                <circle cx="102" cy="111" r="13" />
              </g>
              <g className="cart__lines" stroke="currentColor">
                <polyline className="cart__top" points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" strokeDasharray="338 338" strokeDashoffset="-338" />
                <g className="cart__wheel1" transform="rotate(-90,43,111)">
                  <circle className="cart__wheel-stroke" cx="43" cy="111" r="13" strokeDasharray="81.68 81.68" strokeDashoffset="81.68" />
                </g>
                <g className="cart__wheel2" transform="rotate(90,102,111)">
                  <circle className="cart__wheel-stroke" cx="102" cy="111" r="13" strokeDasharray="81.68 81.68" strokeDashoffset="81.68" />
                </g>
              </g>
            </g>
          </svg>
          <div className="preloader__text">
            <p className="preloader__msg">Bringing you the goods…</p>
            <p className="preloader__msg preloader__msg--last">This is taking long. Something’s wrong.</p>
          </div>
        </div>
      </div>
      )}
                  </div>
                ) : (
                  "Login"
                )}
        {loggedIn && (
          <div>
            <GroceriesList token={token} />
           { navigate("/all-grocery", { replace: true }) }
          
          </div>
        )}
      </div>
    </UserContext.Provider>
  );
};

export default Login;
