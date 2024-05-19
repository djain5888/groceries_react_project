
import React, { useContext,useState, useEffect } from "react";
import axios from "axios";
import "./GroceriesList.css";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext.js'; 
import { getAuthToken,setTitle } from "../../Constants/Constant";
import image1 from "../../Images/image1.png"
import image2 from "../../Images/image3.png"
import image3 from "../../Images/image4.png"


const GroceriesList = ({ token }) => {
  const [groceries, setGroceries] = useState([]);
  const [Apierror, setError] = useState(null); // State variable for error message
  
  const [loading, setLoading] = useState(true);
  const [expandedCard, setExpandedCard] = useState(null);
  const [bidModalOpen, setBidModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [bidAmount, setBidAmount] = useState(0);
  const [bidQuantity, setBidQuantity] = useState(0);

  setTitle("All Groceries")
  window.dispatchEvent(new Event('titleChange'));
  const navigate = useNavigate();
  console.log('in grocery',getAuthToken())
  
  useEffect(() => {
    const fetchGroceries = async () => {
      try {
        const response = await axios.get("https://groceries-i18z.onrender.com/api/groceries", {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        });
        setGroceries(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching groceries:", error);
        setLoading(false);
      }
    };

    fetchGroceries();
  }, [token]);
  const Login = () => {
    const { userProfile, setUserProfile, token, setToken } = useContext(UserContext); // Access user profile and token from context
   
 
    // Rest of your component code...
  };
  
  const handleCloseModal = () => {
    setError(null); // Reset the error state to null
    setBidModalOpen(false); // Close the modal
  };
  const handleClick = () => {
    navigate('/add-grocery', { state: { authToken: getAuthToken() } });
  };
  
  const formatDate = (dateString) => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];

    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear() % 100; // Get last two digits of the year

      // Function to get the ordinal suffix for the day
      const getOrdinalSuffix = (day) => {
        if (day >= 11 && day <= 13) {
          return "th";
        }
        switch (day % 10) {
          case 1:
            return "<sup>st</sup>";
          case 2:
            return "<sup>nd</sup>";
          case 3:
            return "<sup>rd</sup>";
          default:
            return "<sup>th</sup>";
        }
      };

      // Add the ordinal suffix to the day
      const dayWithSuffix = day + getOrdinalSuffix(day);

      return  (     <span dangerouslySetInnerHTML={{ __html: `${dayWithSuffix} ${month}, ${year}` }} />)
      ;
    }
    return 'Invalid Date';
  };
  const imageLinks = [
    image1,image2,image3
  ];

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imageLinks.length);
    return imageLinks[randomIndex];
  };

  const toggleCard = (index) => {
    if (expandedCard === index) {
      setExpandedCard(null);
    } else {
      setExpandedCard(index);
    }
  };

  const handlePlaceBid = (item) => {
    setSelectedItem(item);
    console.log("selected item",selectedItem)
    setBidModalOpen(true);
  };

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedItem)
    try {

      const response = await axios.post(
        `https://groceries-i18z.onrender.com/api/groceries/${selectedItem._id}/bids`,
        {
          amount: bidAmount,
          quantity: bidQuantity
        },
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            "Content-Type": "application/json"
          }
        }
      );

      console.log("Bid placed successfully:", response.data);
      setBidModalOpen(false);
    } catch (error) {
      setError(error.response.data); // Set error message

          console.error("Error placing bid:", error.response.data);
          console.log('api', Apierror)
    }
  };

  return (
    <div>
      {loading &&(
        <div class="preloader">
        <svg class="cart" role="img" aria-label="Shopping cart line animation" viewBox="0 0 128 128" width="128px" height="128px" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="8">
            <g class="cart__track" stroke="hsla(0,10%,10%,0.1)">
              <polyline points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" />
              <circle cx="43" cy="111" r="13" />
              <circle cx="102" cy="111" r="13" />
            </g>
            <g class="cart__lines" stroke="red !important">
              <polyline class="cart__top" points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" stroke-dasharray="338 338" stroke-dashoffset="-338" />
              <g class="cart__wheel1" transform="rotate(-90,43,111)">
                <circle class="cart__wheel-stroke" cx="43" cy="111" r="13" stroke-dasharray="81.68 81.68" stroke-dashoffset="81.68" />
              </g>
              <g class="cart__wheel2" transform="rotate(90,102,111)">
                <circle class="cart__wheel-stroke" cx="102" cy="111" r="13" stroke-dasharray="81.68 81.68" stroke-dashoffset="81.68" />
              </g> 
            </g>
          </g>
        </svg>
        <div class="preloader__text">
          <p class="preloader__msg">Bringing you the goods…</p>
          <p class="preloader__msg preloader__msg--last">This is taking long. Something’s wrong.</p>
        </div>
      </div>
      )}
      <div className="button-container">
        <button className="button-6" onClick={handleClick}>Add New Item</button>
      </div>
      

      <ul className="grocerycards">
      {groceries.map((item, index) => (
        <li key={index}>
          <a href="#" className="card" onClick={() => toggleCard(index)}>
            <img src={getRandomImage()} className="card__image" alt="" />
            <div className="card__overlay">
              <div className="card__header">
                <div className="card__header-text">
                  <h3 className="card__title">{item.itemName}</h3>
                  <span className="card__min-price">Min Price: {item.minPrice}</span>
                </div>
              </div>
              <div className="card__description">
                <div className="info">
                  <span className="card__quantity">Quantity: {item.quantity}</span>
                  <span className="card__expiration">Exp: {formatDate(item.expirationDate)}</span>
                  <span className="No_of_bids">No. of Bids: {item.bids.length}</span>
                </div>
                <div className="button-container_info">
                  <button className="button-6" onClick={() => handlePlaceBid(item)}>Place Bid</button>
                </div>
              </div>
            </div>
          </a>
        </li>
      ))}
    </ul>
      {/* Bid Modal */}
      {bidModalOpen && (
        
      <div className="modal-overlay">
         
       
        <div className="modal">
          <div className="modal-content">
            <h2 className="title">Place Bid</h2>
            <p>{Apierror && Apierror.message}</p>
            
            <form onSubmit={handleBidSubmit}>
              <div className="field">
                <label className="label">Bid Amount:</label>
                <div className="control">
                  <input 
                    type="number" 
                    className="input" 
                    value={bidAmount} 
                    onChange={(e) => setBidAmount(e.target.value)} 
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Bid Quantity:</label>
                <div className="control">
                  <input 
                    type="number" 
                    className="input" 
                    value={bidQuantity} 
                    onChange={(e) => setBidQuantity(e.target.value)} 
                    required
                  />
                </div>
              </div>
              <button type="submit" className="button is-primary">Submit Bid</button>
            </form>
          </div>
          <button className="modal-close" onClick={handleCloseModal}>Close</button>
        </div>
      </div>
    )}
  </div>
);
  
};

export default GroceriesList;

