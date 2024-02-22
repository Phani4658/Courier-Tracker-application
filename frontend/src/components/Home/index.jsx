import { useState } from "react";
import Navbar from "../Navbar";
import "./index.css";
import Cookies from "js-cookie";

function Home() {
  const [trackingNumber,setTrackingNumber] = useState("");
  const [courierDetails,setCourierDetails] = useState({});



  const getCourierDetails = async (e) => {
    e.preventDefault();
    const apiUrl = `https://courier-tracker-backend.onrender.com/couriers/${trackingNumber}`;
    const jwtToken = Cookies.get("jwt_token");
    try{
      const response = await fetch(apiUrl,{headers: {
        "Authorization" : jwtToken,
      }});
      const data = await response.json();
      setCourierDetails(data);
    } catch(e){
      console.log(e);
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return formattedDate;
  };


  return (
    <div>
      <Navbar />
      <section className="top-section">
        <div className="tracking-form-container">
          <form className="tracking-number-form" onSubmit={getCourierDetails}>
            <h3 className="tracking-heading">Enter Tracking Number</h3>
            <div className="input-group">
              <input
                type="text"
                className="input"
                id="trackingNumber"
                name="trackingNumber"
                placeholder="123456789"
                value={trackingNumber}
                onChange={(e) => {setTrackingNumber(e.target.value)}}
              />
              <input className="button--submit" value="Track" type="submit" />
            </div>
          </form>
        </div>
      </section>
      {courierDetails != {} && <div className="courier-details">
          <h2>Tracking Details</h2>
          <div className="">
            <p>Tracking Number: {courierDetails.trackingNumber}</p>
            <p>Status: {courierDetails.status}</p>
            <p>Current Location: {courierDetails.location}</p>
            <p>Estimated Delivery Date: {formatDate(courierDetails.estimatedDeliveryDate)}</p>
          </div>
        </div>}
    </div>
  );
}

export default Home;
