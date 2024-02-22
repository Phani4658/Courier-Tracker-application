import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import "./index.css";
import Cookies from "js-cookie";
import CourierItem from "../CourierItem";

const APIStatusConstants = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure",
};

function AdminPage() {
  const [couriersList, setCouriersList] = useState([]);
  const [apiStatus, setApiStatus] = useState(APIStatusConstants.LOADING);

  const handleDeleteCourier = async (id) => {
    const jwtToken = Cookies.get("jwt_token");
    try {
      await fetch(`http://localhost:3015/couriers/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : jwtToken,
        }
      });
      // Refresh the list of couriers after deletion
      getCouriersList();
    } catch (error) {
      console.error('Error deleting courier:', error);
    }
  };

  const getCouriersList = async () => {
    const apiUrl = "http://localhost:3015/couriers";
    const jwtToken = Cookies.get("jwt_token");

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

  return (
    <div>
      <Navbar />
      <div className="courier-list">
        <h2>Courier List</h2>
        <button>Add Courier</button>
      </div>
      <ul className="">
        {couriersList.map((courier) => (
          <CourierItem courierDetails={courier} deleteCourier={handleDeleteCourier} key={courier._id} />
        ))}
      </ul>
    </div>
  );
}

export default AdminPage;
