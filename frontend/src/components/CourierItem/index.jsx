/* eslint-disable react/prop-types */
import './index.css';
import { MdDeleteOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";



function CourierItem(props) {
    const {courierDetails, deleteCourier} = props;

    const onClickDeleteButton = () => {
        deleteCourier(courierDetails._id);
    }

    
  return (
    <li className='courier-item'>
        <p>{courierDetails.trackingNumber}</p>
        <p>{courierDetails.status}</p>
        <p>{courierDetails.location}</p>
        <p>{courierDetails.estimatedDeliveryDate}</p>
        <div className='icons-container'>
            <MdEdit className='icon' />
            <MdDeleteOutline onClick={onClickDeleteButton   } className='icon' />
        </div>
    </li>
  )
}

export default CourierItem