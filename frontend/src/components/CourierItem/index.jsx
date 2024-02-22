/* eslint-disable react/prop-types */
import "./index.css";
import { MdDeleteOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function CourierItem(props) {
  const { courierDetails, deleteCourier } = props;
  const navigate = useNavigate();

  const onClickDeleteButton = () => {
    deleteCourier(courierDetails._id);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Format the date as desired (e.g., 'MM/DD/YYYY')
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return formattedDate;
  };

  return (
    <li className="courier-item">
      <p>{courierDetails.trackingNumber}</p>
      <p>{courierDetails.status}</p>
      <p>{courierDetails.location}</p>
      <p>{formatDate(courierDetails.estimatedDeliveryDate)}</p>
      <div className="icons-container">
        <MdEdit
          className="icon"
          onClick={() => navigate(`/admin/couriers/${courierDetails._id}`)}
        />
        <MdDeleteOutline onClick={onClickDeleteButton} className="icon" />
      </div>
    </li>
  );
}

export default CourierItem;
