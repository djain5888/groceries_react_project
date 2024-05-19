// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import './bids.css'
// import { getAuthToken } from "../../Constants/Constant";

// const BidsPage = () => {
//   const location = useLocation();
//   const authToken = getAuthToken();
//   const item = location.state?.item || null;
//   const [bids, setBids] = useState(null);  
// //   const groceryID = item?._id || '';

//   useEffect(() => {
     
//       fetchBids();
    
//   }, []);

//   const fetchBids = async () => {
//     console.log("inside fetchbids")
//     try {
//       const url = `https://groceries-i18z.onrender.com/api/groceries/UserBids`;
//       const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to fetch bids');
//       }
  
//       const data = await response.json();
//       console.log(data.matchedBids)
//       setBids(data.matchedBids);
//       console.log("my bids are",bids)
//     } catch (error) {
//       console.error('Error fetching bids:', error.message);
//     }
//   };

  

// //   if (!item) {
// //     return <div>Loading...</div>; // or any other loading indicator
// //   }

//   if (bids.length === 0) {
//     return <div>No bids available.</div>; // Render a message if no bids are available
//   }

//   return (
//     <div className="abc">
//       {bids.map((bid, index) => (
//         <div key={index} class='tile'>
//           <img className='tile-img' />
//           <div className='tile-info'>
//           <p>Amount: {bid.amount} | Bid Status: {bid.status} | Quantity: {bid.quantity}</p>

           
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BidsPage;
import React, { useState, useEffect } from "react";
import './bids.css'
import { getAuthToken } from "../../Constants/Constant";
import { setTitle } from "../../Constants/Constant";


const BidsPage = () => {
  const authToken = getAuthToken();
  const [bids, setBids] = useState(null);  
  const [error, setError] = useState(null); // State to hold error information

 
  const fetchBids = async () => {
    setTitle("Your Bids")
window.dispatchEvent(new Event('titleChange'));

    try {
      console.log(authToken)
      const url = `https://groceries-i18z.onrender.com/api/groceries/UserBids`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        console.log("error in bids",response)
        throw new Error('Failed to fetch bids');
      }


      const data = await response.json();
      setBids(data.matchedBids);
      setError(null); // Reset error state if successful
    } catch (error) {
      setError('Error fetching bids. Please try again.'); // Set error message
      console.error('Error fetching bids:', error.message);
    }
  };
  useEffect(() => {
    fetchBids();
  }, [fetchBids]);

  if (error) {
    return <div>Error: {error}</div>; // Render error message if there's an error
  }

  if (!bids) {
    return <div>Loading...</div>; // Render a loading indicator
  }

  if (bids.length === 0) {
    return <div>No bids available.</div>; // Render a message if no bids are available
  }

  return (
    <div className="abc grid-container">
    {bids.map((bid, index) => (
      <div key={index} class='tile'>
        <img className='tile-img' alt="" />
        <div className='tile-info'>
          <p>Amount: {bid.amount} | Bid Status: {bid.status} | Quantity: {bid.quantity}</p>
        </div>
      </div>
    ))}
  </div>
);
};

export default BidsPage;
