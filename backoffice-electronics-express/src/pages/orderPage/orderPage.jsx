import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from 'react-alert'

import './orderPage.css'

import { getOrderById, reset, updateOrder } from '../../features/order/orderSlice';
import OrderItem from '../../components/orderItem/orderItem';

export default function OrderPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { isLoggedIn} = useSelector((state) => state.admins);

    const { orderIsError, selectedOrder, orderISuccess, orderIsLoading,
        orderMessage, orderCreated } = useSelector((state) => state.orders);
    
    const [order, setOrder] = useState({
        shippingAddress: {
            addressCity: "",
            addressLine1: "",
            addressLine2: ""
        },
        customer: {
            name: "",
            number: "",
            email: "",
        },
        orderStatus: "",
    })
    

        useEffect(() => {
            if (!isLoggedIn) {
                navigate("/login")
            }
    
            if (orderIsError) {
                alert.error(orderMessage);
            }

            if (orderISuccess) {
                alert.info("Modification réussi")
            }
    
            dispatch(getOrderById(id));

            setOrder(selectedOrder)
    
            dispatch(reset());
        }, [isLoggedIn, dispatch, navigate, orderIsError, orderISuccess, selectedOrder]);
    
    
    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setOrder(prev => ({
            shippingAddress: {
                ...prev.shippingAddress,
                [name]: value,
            }
        }))
    }

    const handleStatusChange = (evt) => {
        setOrder(prev => ({
            ...prev,
            orderStatus: evt.target.value
        }))
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const updatedData = {
            id,
            order: {
                address: order.shippingAddress,
                orderStatus: order.orderStatus,
            }
        }

        dispatch(updateOrder(updatedData));
    }


    console.log(order)

return (
<div className='create-admin'>
<form className="row g-3 needs-validation" novalidate>
<h4>Détail de la commande</h4>

<div className='status'>

    <div className="col-12">
        <label className="col-form-label">Statut</label>
        <div>
                  <select
                    name="orderStatus"
                    className="form-control"
                    onChange={handleStatusChange}
                    value={order.orderStatus}
                  >
                    <option value="NEW">Nouvelle</option>
                    <option value="SHIPPED">Expédié</option>
                    <option value="DELIVERED">Livré</option>
                    <option value="CANCELLED">Annulé</option>
                  </select>
        </div>
    </div>
</div>
            
<div className="products-list">
    <h4>List des produits</h4> 
        {
            selectedOrder?.lineItems?.map(lineItem=><OrderItem item={lineItem} key={lineItem.lineItemId}/>)
        }
</div>

<div className="customer">
<h4>Client:</h4> 
<div className="col-12">
    <label htmlFor="name" className="form-label">Nom:</label>
    <input type="text" className="form-control" name='name' 
      value={order.customer.name} disabled />
</div>
<div className="col-12">
    <label htmlFor="number" className="form-label">numero:</label>
    <input type="text" className="form-control" name='number' 
      value={order.customer.number} disabled />
</div>
<div className="col-12">
    <label htmlFor="email" className="form-label">Email:</label>
    <input type="text" className="form-control" name='email' 
      value={order.customer.email} disabled />
</div>
                
</div>

<div className="address">
<h4>Adresse de livraison:</h4>
<div className="col-12">
    <label htmlFor="addressCity" className="form-label">Ville:</label>
    <input type="text" className="form-control" name='addressCity' 
     onChange={handleChange} value={order.shippingAddress.addressCity} />
</div>
<div className="col-12">
    <label htmlFor="addressLine1" className="form-label">Quartier:</label>
    <input type="text" className="form-control" name='addressLine1'
     onChange={handleChange} value={order.shippingAddress.addressLine1} />
</div>
<div className="col-12">
    <label htmlFor="addressLine2" className="form-label">Autre descriptif:</label>
    <input type="text" className="form-control" name='addressLine2'
     onChange={handleChange} value={order.shippingAddress.addressLine2}  />
</div>
</div>

  <div className="col-12">
    <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Modifier</button>
  </div>
</form>
</div>
  )
}
