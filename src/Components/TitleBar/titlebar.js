import React, { useState, forwardRef ,useEffect} from "react";
import titleBarStyle from "./TitleBar.module.css";
import { useNavigate ,useLocation} from 'react-router-dom';
import { getAuthToken,getUserProfile,removeAuthToken,resetUserProfile,getTitle, setTitle ,resetTitle} from "../../Constants/Constant";


const TitleBar = forwardRef((props, ref) => {
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // console.log('iiiiiiiiiiiiiiiiiiiinnnnnnnnn',getTitle())
  setTitle('Login')
  const [pageInfo, setPageInfo] = useState("Default Page Info");
  
  let [userProfile,setUserProfile] = useState(null); // This should be useState or useContext, depending on your application
  console.log('intitle bar',getAuthToken())

  const handleLogout = () => {
   
    sessionStorage.clear();
    removeAuthToken(); // Clear authentication token
    resetUserProfile(); 
    resetTitle()// Reset user profile in session storage

    // Clear browser history
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = () => {
      window.history.go(1);
    };

    navigate('/');
    setTitle("Login")
    window.dispatchEvent(new Event('titleChange'));
    // window.location.reload();

     // Redirect to login page
  };
 
  // console.log("in title bar",getUserProfile().name)
  // useEffect(() => {
  //   console.log('in profile data')
  //   const userProfileData = getUserProfile();
  //   setUserProfile(userProfileData);
  // }, []);
  useEffect(() => {
    console.log('in profile data');
    try {
      setPageInfo(getTitle())
        const userProfileData = getUserProfile();
        setUserProfile(userProfileData);
        const updateTitle = () => {
          console.log("inside update title ",getTitle())
          setPageInfo(getTitle());
        };
        window.addEventListener('titleChange', updateTitle);

        return () => {
          window.removeEventListener('titleChange', updateTitle);
        };

    } 
    catch (error) {
        console.error('Error fetching user profile:', error);
    }
},getTitle(),location);


  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleShowGrocery = () => {
    navigate('/user-grocery', { state: { authToken: getAuthToken() } });
  };
  const handleShowAllGrocery = () => {
    navigate("/all-grocery", { replace: true });  
  };


  const handleShowBids = () => {
    navigate('/UserBids')
    // Handle navigation to bids page
  };

//   
return (
  <div className={titleBarStyle["title-bar"]} ref={ref}>

    <div className={titleBarStyle.logo}>
      {/* Logo */}

    </div>
    <div className={titleBarStyle["user-profile"]}>

      {showOptions && (
        <div className={titleBarStyle["options-wrapper"]}>
          <div className={titleBarStyle["options-container"]}>
            <span className={titleBarStyle["user-profile-email"]}>{userProfile && userProfile.email}</span>
            <button onClick={handleShowGrocery}>Show My Grocery</button>
            <button onClick={handleShowAllGrocery}>Show All Grocery</button>

            <button onClick={handleShowBids}>Show My Bids</button>
            <button onClick={handleLogout}>LogOut</button>
          </div>
        </div>
      )}
    </div>

    <div className={titleBarStyle["navigation-icon"]} onClick={toggleOptions}>
      <div className={titleBarStyle["heading"]}>GrocBidder</div>
      <div className={titleBarStyle["centered-text"]}>{pageInfo}</div> {/* Add this line */}

      <span className={titleBarStyle["user-profile-name"]} onClick={toggleOptions}>{userProfile && userProfile.name}</span> 
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M4 12l8 8H4v-8zm2 7.17L6.83 18H10v-3H2v2.17zm16.05-5.75l-1.79-1.79c-.29-.29-.77-.29-1.06 0s-.29.77 0 1.06L18.17 13H14v2h4.17l-1.79 1.79c-.29.29-.29.77 0 1.06.15.15.35.22.53.22s.38-.08.53-.22l2.79-2.79c.29-.29.29-.77 0-1.06zM12 3C6.48 3 2 7.48 2 13s4.48 10 10 10 10-4.48 10-10S17.52 3 12 3zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
      </svg>
    </div>
  </div>
);

});
export default TitleBar;
