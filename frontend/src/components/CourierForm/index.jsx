/* eslint-disable react/prop-types */
import "./index.css";
import { useEffect, useState } from "react";

function CourierForm({ handleSubmit, courierDetails, isAddCourier }) {
  const [courierName, setCourierName] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [status, setStatus] = useState("Order Placed");
  const [fromAddress, setFromAdress] = useState("");
  const [toAddress, setToAdress] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState("");

  useEffect(() => {
    if (courierDetails) {
      setCourierName(courierDetails.courierName);
      setTrackingNumber(courierDetails.trackingNumber);
      setStatus(courierDetails.status);
      setFromAdress(courierDetails.fromAddress);
      setToAdress(courierDetails.toAddress);
      setCurrentLocation(courierDetails.currentLocation);
      if (courierDetails && courierDetails.estimatedDeliveryDate) {
        const formattedDate = new Date(courierDetails.estimatedDeliveryDate)
          .toISOString()
          .split("T")[0];
        setEstimatedDeliveryDate(formattedDate);
      }
    }
  }, [courierDetails]);

  const onClickSubmitButton = (event) => {
    const courierDetails = {
      courierName,
      trackingNumber,
      status,
      fromAddress,
      toAddress,
      currentLocation: isAddCourier ? fromAddress : currentLocation,
      estimatedDeliveryDate,
    };
    handleSubmit(event, courierDetails);
  };

  const generateTrackingNumber = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  };

  useEffect(() => {
    setTrackingNumber(generateTrackingNumber());
  }, []);

  return (
    <form onSubmit={onClickSubmitButton} className="courier-form">
      <label htmlFor="courierName">Courier Name: </label>
      <input
        type="text"
        id="courierName"
        value={courierName}
        onChange={(e) => setCourierName(e.target.value)}
        required
      />
      <div className="form-single-row">
        <div>
          <label htmlFor="trackingNumber">Tracking Number:</label>
          <input
            type="text"
            id="trackingNumber"
            value={trackingNumber}
            className="read-only-input"
            readOnly
            required
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="Order Placed">Order Placed</option>
            <option value="Order Packed">Order Packed</option>
            <option value="Shipped">Shipped</option>
            <option value="In Transit">In Transit</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      </div>
      <div className="form-single-row">
        <div>
          <label htmlFor="fromAddress">From City</label>
          <input
            type="text"
            id="fromAddress"
            value={fromAddress}
            onChange={(e) => {
              setFromAdress(e.target.value);
            }}
            required
          />
        </div>
        <div>
          <label htmlFor="toAddress">To City</label>
          <input
            type="text"
            id="toAddress"
            value={toAddress}
            onChange={(e) => {
              setToAdress(e.target.value);
            }}
            required
          />
        </div>
        {!isAddCourier && (
          <div>
            <label htmlFor="currentLocation">Current Location</label>
            <input
              type="text"
              id="currentLocation"
              value={currentLocation}
              onChange={(e) => {
                setCurrentLocation(e.target.value);
              }}
              required
            />
          </div>
        )}
      </div>
      <label htmlFor="estimatedDeliveryDate">Estimated Delivery Date:</label>
      <input
        type="date"
        id="estimatedDeliveryDate"
        value={estimatedDeliveryDate}
        onChange={(e) => setEstimatedDeliveryDate(e.target.value)}
        required
      />
      <button type="submit">
        {isAddCourier ? "Add Courier Details" : "Update Courier Details"}
      </button>
    </form>
  );
}

export default CourierForm;
