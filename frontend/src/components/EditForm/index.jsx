import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingView from "../LoadingView";
import Navbar from "../Navbar";
import { IoMdArrowRoundBack } from "react-icons/io";
import CourierForm from "../CourierForm";

const APIStatusConstants = {
  INITIAL: "initial",
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure",
};

const EditForm = () => {
  const [courierDetails, setCourierDetails] = useState({});
  const [apiStatus, setApiStatus] = useState(APIStatusConstants.LOADING);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourier();
  }, [id]);

  const fetchCourier = async () => {
    setApiStatus(APIStatusConstants.LOADING);
    const jwtToken = Cookies.get("admin_jwt_token");

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
      setCourierDetails(data);
      setApiStatus(APIStatusConstants.INITIAL);
    } catch (error) {
      console.error("Error fetching courier:", error);
    }
  };

  const handleSubmit = async (e, updatedCourierDetails) => {
    e.preventDefault();
    setApiStatus(APIStatusConstants.LOADING);
    const jwtToken = Cookies.get("admin_jwt_token");

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
            ...updatedCourierDetails,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update courier");
      }

      alert("Courier order updated successfully");
      navigate('/admin');
    } catch (error) {
      alert("Error updating courier order");
    }
  };

  return apiStatus === APIStatusConstants.INITIAL ? (
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
        <h2>Edit Courier Order</h2>
      </section>
      <div className="courier-form-container">
        <CourierForm
          courierDetails={courierDetails}
          handleSubmit={handleSubmit}
          isAddCourier={false}
        />
      </div>
    </>
  ) : (
    <LoadingView />
  );
};

export default EditForm;
