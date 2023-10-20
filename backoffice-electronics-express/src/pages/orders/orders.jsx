import React from 'react'
import { useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


import './orders.css'

import { getAllOrders, reset } from '../../features/order/orderSlice'
import Spinner from '../../components/spinner/spinner.component'

export default function OrdersPage() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.admins);
  
  const {orders, orderIsError, orderISuccess, orderIsLoading,
        orderMessage } = useSelector((state) => state.orders);

  
  
    useEffect(() => {
      if (!isLoggedIn) {
          navigate("/login")
      }

      dispatch(getAllOrders());

      if (orderIsError) {
          alert.error(orderMessage);
      }

      dispatch(reset());
    }, [isLoggedIn, dispatch, navigate, orderIsError]);
  
  
  
  if (orderIsLoading) {
      return <Spinner/>
    }
    
    console.log(orders)

  return (
    <div className='orders-page'>
      <div className='orders-page-container'>
        <div className="orders-page-header">
        <h4>Commandes</h4>
        <button type="button" className="btn btn-primary" onClick={()=>navigate("/create-order")}>Ajouter une commande</button>
        </div>
        <div className='orders-table table-responsive'>

<table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Statut</th>
      <th scope="col">Montant</th>
      <th scope="col">Date</th>
      <th scope="col">Client</th>
      <th scope="col">Contact</th>
      <th scope="col">Ville</th>
      <th scope="col">Quartier</th>
    </tr>
  </thead>
  <tbody>
  {orders.map(order=><tr key={order.orderId}>
      <td onClick={()=>navigate(`/orders/${order.orderId}`)}>{order.orderId}</td>
      <td>{order.orderStatus}</td>
      <td>{order.orderAmount}</td>
      <td>{order.createdAt}</td>
      <td>{order?.customer?.name}</td>
      <td>{order?.customer?.number}</td>
      <td>{order?.shippingAddress?.addressCity}</td>
      <td>{order?.shippingAddress?.addressLine1}</td>
    </tr>)}
  </tbody>
</table>
        </div>
      </div>
    </div>
  )
}
