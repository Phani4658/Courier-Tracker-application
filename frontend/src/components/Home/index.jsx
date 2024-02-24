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

  return (
    <div>
      <section className="top-section">
        <div className="home-buttons">
          <button
            className="admin-button"
            onClick={() => {
              navigate("/admin/login");
            }}
          >
            Admin
          </button>
          <button
            className="admin-button"
            onClick={() => {
              Cookies.remove("jwt_token");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
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
            <h2>Courier Details</h2>
            <div className="courier-detail-container">
              <div>
                <p>Courier Name: {courierDetails.courierName}</p>
                <p>Tracking Number: {courierDetails.trackingNumber}</p>
              </div>
              <div>
                <p>From: {courierDetails.fromAddress}</p>
                <p>To: {courierDetails.toAddress}</p>
              </div>
              <p>
                Estimated Delivery Date:{" "}
                {new Date(
                  courierDetails.estimatedDeliveryDate
                ).toLocaleDateString()}
              </p>
            </div>
            <h3>Tracking History</h3>
            <table>
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Updated Date</th>
                  <th>Updated Time</th>
                  <th>Current Location</th>
                </tr>
              </thead>
              <tbody>
                {courierDetails.trackingHistory.map((entry, index) => {
                  console.log(entry);
                  return (
                    <tr key={index}>
                      <td>{entry.status}</td>
                      <td>{new Date(entry.timestamp).toLocaleDateString()}</td>
                      <td>{new Date(entry.timestamp).toLocaleTimeString()}</td>
                      <td>{entry.currentLocation}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;
