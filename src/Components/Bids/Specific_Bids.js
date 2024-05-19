

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import './bids.css';
import { setTitle } from "../../Constants/Constant";
setTitle("All Bids")
window.dispatchEvent(new Event('titleChange'));
const BidsPage = () => {
  const location = useLocation();
  const authToken = location.state?.authToken || '';
  const item = location.state?.item || null;
  const [bids, setBids] = useState(item?.bids || []);
  const [popup, setPopup] = useState({ visible: false, message: '' });
  const groceryID = item?._id || '';


  const fetchBids = async (groceryID) => {
    setTitle("All Bids")
window.dispatchEvent(new Event('titleChange'));
    try {
      const url = `https://groceries-i18z.onrender.com/api/groceries/${groceryID}/bids`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to fetch bids:', response.status, errorText);
        throw new Error('Failed to fetch bids');
      }

      const data = await response.json();
      setBids(data.bids);
    } catch (error) {
      console.error('Error fetching bids:', error.message);
    }
  };
  
  useEffect(() => {
    if (groceryID) {
      fetchBids(groceryID);
    }
  }, [groceryID]);

  const acceptBid = async (id) => {
    const url = `https://groceries-i18z.onrender.com/api/groceries/${groceryID}/accept-bid`;
    const headers = {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    };
    const body = JSON.stringify({ bidId: id });
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body,
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error('Failed to accept bid:', response.status, responseData.message);
        throw new Error(responseData.message || 'Failed to accept bid');
      }

      // Handle successful response
      console.log('Bid accepted:', responseData);
      setPopup({ visible: true, message: 'Bid accepted successfully!' });
      fetchBids(groceryID);

    } catch (error) {
      console.error('Error accepting bid:', error.message);
      setPopup({ visible: true, message: `Error: ${error.message}` });
    }
  };

  const closePopup = () => {
    setPopup({ visible: false, message: '' });
  };

  if (!item) {
    return <div>Loading...</div>; // or any other loading indicator
  }

  if (bids.length === 0) {
    return <div>No bids available.</div>; // Render a message if no bids are available
  }

  return (
    <div className="abc">
      {bids.map((bid, index) => (
        <div key={index} className='tile'>
          <img className='tile-img' alt="" />
          <div className='tile-info'>
            <h4>Amount: {bid.amount} Bid Status: {bid.status}</h4>
            <p>Quantity: {bid.quantity}</p>
            <button className="button-6" onClick={() => acceptBid(bid._id)}>Accept Bid</button>
            <button className="button-6">Reject Bid</button>
          </div>
        </div>
      ))}
      {popup.visible && (
        <div className="popup">
          <div className="popup-content">
            <p>{popup.message}</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BidsPage;
