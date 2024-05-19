import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate ,useLocation} from 'react-router-dom';
import './add-grocery.css'; // Import CSS file for popups
import { getAuthToken,getUserProfile } from "../../Constants/Constant";

const AddGroceryPage = () => {
    // const locationn = useLocation();
    const authToken = getAuthToken();
   
    console.log(authToken)
    const [itemName, setItemName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [expirationDate, setExpirationDate] = useState("");
    const [location, setLocation] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [sellerContact, setSellerContact] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        // Fetch the user profile and set the seller contact
        const fetchUserProfile = async () => {
            const userProfile = await getUserProfile();
            setSellerContact(userProfile.email);
        };fetchUserProfile();
    }, []);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        

        try {
            const response = await axios.post(
                "https://groceries-i18z.onrender.com/api/groceries",
                {
                    itemName,
                    quantity,
                    expirationDate,
                    location,
                    minPrice,
                    sellerContact,
                    bids: []
                },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log("Grocery added successfully:", response.data);
            setSuccess(true);

            setTimeout(() => {
                setSuccess(false);
                navigate('/user-grocery', { state: { authToken } });
            }, 2000); // Change the timeout as needed
        } catch (error) {
            console.error("Error adding grocery:", error);
            setError(error.response.data.message); // Assuming your API returns an error message
            setTimeout(() => {
                setError(null);
            }, 5000); // Change the timeout as needed
        }
    };

    console.log("Success:", success);
    console.log("Error:", error);

    return (
        <div className='container'>
            {/* <h1>Add Grocery</h1> */}
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group"> {/* Add form-group class */}

                    <label>
                        Item Name:
                        <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />
                    </label>
                    <label>
                        Quantity:
                        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    </label>
                    <label>
                        Expiration Date:
                        <input type="date" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} />
                    </label>
                    <label>
                        Location:
                        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                    </label>
                    <label>
                        Min Price:
                        <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                    </label>
                    <label>
                        Seller Contact:
                        <input type="email" value={sellerContact} onChange={(e) => setSellerContact(e.target.value)} />
                    </label>

                    <button type="submit">Submit</button>
                </div>

            </form>
            {success && <div className="popup success">Grocery added successfully!</div>}
            {error && <div className="popup error">{error}</div>}
        </div>
    );
};

export default AddGroceryPage;
