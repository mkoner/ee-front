import React from 'react'
import { useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


import './customers.css'

import { getAllUsers, reset } from '../../features/customer/customerSlice'
import Spinner from '../../components/spinner/spinner.component'

export default function CustomersPage() {
  const alert = useAlert()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { isLoggedIn, adminMessage } = useSelector((state) => state.admins)

  const { customers, customerIsError, customerISuccess, customerIsLoading,
    customerMessage } = useSelector((state) => state.customers);
  
  
    useEffect(() => {
      if (!isLoggedIn) {
          navigate("/login")
      }

      dispatch(getAllUsers());

      if (customerIsError) {
          alert.error(customerMessage);
      }

      dispatch(reset());
    }, [isLoggedIn, dispatch, navigate, customerIsError]);
  
  
  
  if (customerIsLoading) {
      return <Spinner/>
  }

  return (
    <div className='customers-page'>
      <div className='customers-page-container'>
        <div className="customers-page-header">
        <h4>Clients</h4>
        <button type="button" class="btn btn-primary" onClick={()=>navigate("/create-customer")}>Ajouter un client</button>
        </div>
        <div className='customers-table table-responsive'>

<table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Nom</th>
      <th scope="col">Numéro</th>
      <th scope="col">Email</th>
    </tr>
  </thead>
  <tbody>
    {customers?.map(customer=><tr key={customer.customerId}>
      <td>{customer.customerId}</td>
      <td>{customer.name}</td>
      <td>{customer.number}</td>
      <td>{customer.email}</td>
    </tr>)}
  </tbody>
</table>
        </div>
      </div>
    </div>
  )
}
