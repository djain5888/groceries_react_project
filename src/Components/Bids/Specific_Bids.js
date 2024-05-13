import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import './bids.css'

const BidsPage = () => {
  const location = useLocation();
  const authToken = location.state?.authToken || '';
  const item = location.state?.item || null;
  const [bids, setBids] = useState(item?.bids || []);  
  const groceryID = item?._id || '';

  useEffect(() => {
    if (groceryID) {
      fetchBids(groceryID);
    }
  }, [groceryID]);

  const fetchBids = async (groceryID) => {
    try {
      const url = `https://groceries-i18z.onrender.com/api/groceries/${groceryID}/bids`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch bids');
      }
  
      const data = await response.json();
      setBids(data.bids);
    } catch (error) {
      console.error('Error fetching bids:', error.message);
    }
  };

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

      if (!response.ok) {
        throw new Error('Failed to accept bid');
      }

      // Handle successful response
      const data = await response.json();
      console.log('Bid accepted:', data);
      fetchBids(groceryID);
    } catch (error) {
      console.error('Error accepting bid:', error.message);
    }
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
        <div key={index} class='tile'>
          <img className='tile-img' />
          <div className='tile-info'>
            <h4>Amount: {bid.amount} Bid Status: {bid.status}</h4>
            <p>Quantity: {bid.quantity}</p>
            <button className="button-6" onClick={() => acceptBid(bid._id)}>Accept Bid</button>
            <button className="button-6">Reject Bid</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BidsPage;
