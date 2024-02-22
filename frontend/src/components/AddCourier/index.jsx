import { useEffect, useState } from "react";
import "./index.css";
import Cookies from "js-cookie";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";

function AddCourier() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [status, setStatus] = useState("Shipped");
  const [location, setLocation] = useState("");
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const generateTrackingNumber = () => {
    // Generate a random 8-digit tracking number
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  };

  useEffect(() => {
    setTrackingNumber(generateTrackingNumber());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jwtToken = Cookies.get("jwt_token");
    setLoading(true);

    try {
      const response = await fetch(
        "https://courier-tracker-backend.onrender.com/admin/couriers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: jwtToken,
          },
          body: JSON.stringify({
            trackingNumber,
            status,
            location,
            estimatedDeliveryDate,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error adding courier order");
      }

      alert("Courier order added successfully");
      // Clear form fields after successful submission
      setTrackingNumber("");
      setStatus("");
      setLocation("");
      setEstimatedDeliveryDate("");
      navigate('/admin')
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="courier-container">
        <div className="courier-form-container">
          <h2>Add New Courier Order</h2>
          <form onSubmit={handleSubmit} className="courier-form">
            <label htmlFor="trackingNumber">Tracking Number:</label>
            <input
              type="text"
              id="trackingNumber"
              value={trackingNumber}
              className="read-only-input"
              readOnly
              required
            />
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="Shipped">Shipped</option>
              <option value="In Transit">In Transit</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <label htmlFor="estimatedDeliveryDate">
              Estimated Delivery Date:
            </label>
            <input
              type="date"
              id="estimatedDeliveryDate"
              value={estimatedDeliveryDate}
              onChange={(e) => setEstimatedDeliveryDate(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Courier Order"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default AddCourier;
