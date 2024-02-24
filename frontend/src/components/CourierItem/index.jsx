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

  return (
    <li className="courier-item">
      <p>{courierDetails.courierName}</p>
      <p>{courierDetails.trackingNumber}</p>
      <p>{courierDetails.currentLocation}</p>
      <p>{courierDetails.status}</p>
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
