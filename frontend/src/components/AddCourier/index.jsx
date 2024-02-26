import { useEffect, useState } from "react";
import "./index.css";
import Cookies from "js-cookie";
import Navbar from "../Navbar";
import { IoMdArrowRoundBack } from "react-icons/io";

import { useNavigate } from "react-router-dom";
import CourierForm from "../CourierForm";

const APIStatusConstants = {
  INITIAL: "initial",
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure",
};

function AddCourier() {
  const [addedCourierDetails, setAddCourierDetails] = useState({});
  const [trackingNumber,setTrackingNumber] = useState({});
  const [apiStatus, setApiStatus] = useState(APIStatusConstants.INITIAL);
  const navigate = useNavigate();

  const generateTrackingNumber = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  };

  useEffect(() => {
    setTrackingNumber(generateTrackingNumber());
  }, []);

  const handleSubmit = async (e, courierDetails) => {
    e.preventDefault();
    const jwtToken = Cookies.get("admin_jwt_token");
    setApiStatus(APIStatusConstants.LOADING);

    try {
      console.log(JSON.stringify({ ...courierDetails }));
      const response = await fetch(
        "https://courier-tracker-backend.onrender.com/admin/couriers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: jwtToken,
          },
          body: JSON.stringify({
            ...courierDetails,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error adding courier order");
      }

      const data = await response.json();
      console.log(data);

      setAddCourierDetails(data);
      setApiStatus(APIStatusConstants.SUCCESS);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const renderSuccessView = () => (
    <div className="added-success">
      <img
        src="https://img.freepik.com/free-vector/order-confirmed-concept-illustration_114360-6599.jpg?t=st=1708788935~exp=1708792535~hmac=69897ba93f3a873bc632325dbcf45acfbace0c1936ce38e6e765cac40ba06fd8&w=826"
        className="added-successfully"
      />
      <h3 className="success-message">Courier Has been added Successfully.</h3>
      <h3>Track your order using</h3>
      <h2 className="tracking-number">{addedCourierDetails.trackingNumber}</h2>
      <button
        onClick={() => {
          navigate("/admin/add");
          setApiStatus(APIStatusConstants.INITIAL);
        }}
      >
        Add new Courier
      </button>
    </div>
  );

  const renderIntialView = () => (
    <div className="courier-form-container">
      <CourierForm handleSubmit={handleSubmit} isAddCourier={true} newTrackingNumber={trackingNumber} />
    </div>
  );

  const renderFinalView = () => {
    switch (apiStatus) {
      case APIStatusConstants.INITIAL:
        return renderIntialView();
      case APIStatusConstants.SUCCESS:
        return renderSuccessView();
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <section className="top-heading-container">
        <button
          className="icon-container"
          onClick={() => {
            navigate("/admin");
          }}
        >
          <IoMdArrowRoundBack />
        </button>
        <h2>Add New Courier Order</h2>
      </section>
      <section className="courier-container">{renderFinalView()}</section>
    </>
  );
}

export default AddCourier;
