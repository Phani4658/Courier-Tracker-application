import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingView from "../LoadingView";
import Navbar from "../Navbar";

const EditForm = () => {
  const [courier, setCourier] = useState(null);
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetchCourier();
  }, [id]);

  const fetchCourier = async () => {
    const jwtToken = Cookies.get("jwt_token");

    try {
      const response = await fetch(
        `https://courier-tracker-backend.onrender.com/admin/couriers/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: jwtToken,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch courier");
      }
      const data = await response.json();
      setCourier(data);
      setStatus(data.status);
      setLocation(data.location);
      setEstimatedDeliveryDate(data.estimatedDeliveryDate);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching courier:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const jwtToken = Cookies.get("jwt_token");

    try {
      const response = await fetch(
        `https://courier-tracker-backend.onrender.com/admin/couriers/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: jwtToken,
          },
          body: JSON.stringify({
            status,
            location,
            estimatedDeliveryDate,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update courier");
      }

      alert("Courier order updated successfully");
    } catch (error) {
      alert("Error updating courier order");
    } finally {
      setLoading(false);
    }
  };

  return !loading ? (
    <>
      <Navbar />

      <section className="courier-container">
        <div className="courier-form-container">
          <h2>Edit Courier Order</h2>
          <form onSubmit={handleSubmit} className="courier-form">
            <label htmlFor="trackingNumber">Tracking Number:</label>
            <input
              type="text"
              id="trackingNumber"
              value={courier?.trackingNumber || ""}
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
              value={
                new Date(estimatedDeliveryDate).toISOString().split("T")[0]
              }
              onChange={(e) => setEstimatedDeliveryDate(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Update Courier Order"}
            </button>
          </form>
        </div>
      </section>
    </>
  ) : (
    <LoadingView />
  );
};

export default EditForm;
