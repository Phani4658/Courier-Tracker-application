import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import "./index.css";
import Cookies from "js-cookie";
import CourierItem from "../CourierItem";
import { useNavigate } from "react-router-dom";
import FailureView from "../FailureView";
import LoadingView from "../LoadingView";

const APIStatusConstants = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure",
};

function AdminPage() {
  const [couriersList, setCouriersList] = useState([]);
  const [apiStatus, setApiStatus] = useState(APIStatusConstants.LOADING);
  const navigate = useNavigate();

  const handleDeleteCourier = async (id) => {
    const jwtToken = Cookies.get("admin_jwt_token");
    try {
      await fetch(
        `https://courier-tracker-backend.onrender.com/admin/couriers/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: jwtToken,
          },
        }
      );
      // Refresh the list of couriers after deletion
      getCouriersList();
    } catch (error) {
      console.error("Error deleting courier:", error);
    }
  };

  const getCouriersList = async () => {
    setApiStatus(APIStatusConstants.LOADING);
    const apiUrl =
      "https://courier-tracker-backend.onrender.com/admin/couriers";
    const jwtToken = Cookies.get("admin_jwt_token");

    try {
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: jwtToken,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setCouriersList(data);
        setApiStatus(APIStatusConstants.SUCCESS);
      } else {
        setApiStatus(APIStatusConstants.FAILURE);
      }
    } catch (e) {
      setApiStatus(APIStatusConstants.FAILURE);
      console.log(e);
    }
  };

  useEffect(() => {
    getCouriersList();
  }, []);

  const renderSuccessView = () => {
    if (couriersList.length === 0) {
      return (
        <div className="no-items-container">
          <img
            src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127829.jpg?w=826&t=st=1708591924~exp=1708592524~hmac=02aa5a6321e2ece8b4ccaf3503bf5326b1ea7161bf2fa007fe41c82fb2bf830b"
            alt="No Data"
          />
          <p>No Couriers Exist...Create new Courier</p>
          <button
            className="add-courier-btn"
            onClick={() => navigate("/admin/add")}
          >
            Add Courier
          </button>
        </div>
      );
    }
    return (
      <>
        <ul className="courier-list-headings">
          <li className="courier-list-heading">Courier Name</li>
          <li className="courier-list-heading">Tracking Number</li>
          <li className="courier-list-heading">Current Location</li>
          <li className="courier-list-heading">Current Status</li>
        </ul>
        <ul className="">
          {couriersList.map((courier) => (
            <CourierItem
              courierDetails={courier}
              deleteCourier={handleDeleteCourier}
              key={courier._id}
            />
          ))}
        </ul>
      </>
    );
  };

  const renderFinalView = () => {
    switch (apiStatus) {
      case APIStatusConstants.SUCCESS:
        return renderSuccessView();
      case APIStatusConstants.FAILURE:
        return <FailureView getCouriersList={getCouriersList} />;
      case APIStatusConstants.LOADING:
        return <LoadingView />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="courier-list">
        <h2>Courier List</h2>
        {apiStatus === APIStatusConstants.SUCCESS && (
          <button
            className="add-courier-btn"
            onClick={() => navigate("/admin/add")}
          >
            Add Courier
          </button>
        )}
      </div>
      {renderFinalView()}
    </div>
  );
}

export default AdminPage;
