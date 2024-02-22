import { useState } from "react";
import "./index.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Home() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [courierDetails, setCourierDetails] = useState(null);
  const navigate = useNavigate("");

  const getCourierDetails = async (e) => {
    e.preventDefault();
    setCourierDetails(null);
    const apiUrl = `https://courier-tracker-backend.onrender.com/couriers/${trackingNumber}`;
    const jwtToken = Cookies.get("jwt_token");
    try {
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: jwtToken,
        },
      });
      const data = await response.json();
      console.log(data);
      setCourierDetails(data);
    } catch (e) {
      console.log(e);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return formattedDate;
  };

  return (
    <div>
      <section className="top-section">
        <button
          className="admin-button"
          onClick={() => {
            navigate("/admin/login");
          }}
        >
          Admin
        </button>
        <h1 className="track-delivery">Tracking</h1>
      </section>
      <section className="tracking-form-container">
        <p>Enter Eight Digit Tracking Number</p>
        <form className="tracking-form" onSubmit={getCourierDetails}>
          <input
            type="text"
            placeholder="Tracking Number"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
          />
          <button className="track-button" type="submit">
            Track
          </button>
        </form>
      </section>
      {courierDetails && (
        <section className="courier-details-container">
          <div className="courier-details">
            <h3>Courier Details</h3>
            <p>Tracking Number: {courierDetails.trackingNumber}</p>
            <p>Status: {courierDetails.status}</p>
            <p>Location: {courierDetails.location}</p>
            <p>
              Estimated Delivery Date:{" "}
              {formatDate(courierDetails.estimatedDeliveryDate)}
            </p>
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;
