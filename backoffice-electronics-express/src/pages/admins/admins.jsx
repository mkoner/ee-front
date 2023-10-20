import React from 'react'
import { useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


import './admins.css'

import { getAllUsers, reset } from '../../features/admin/adminSlice'
import Spinner from '../../components/spinner/spinner.component'

export default function AdminsPage() {
  const alert = useAlert()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn, admins, adminIsError, adminISuccess, adminIsLoading,
    adminMessage } = useSelector((state) => state.admins);
  
  
    useEffect(() => {
      if (!isLoggedIn) {
          navigate("/login")
      }

      dispatch(getAllUsers());

      if (adminIsError) {
          alert.error(adminMessage);
      }

      dispatch(reset());
    }, [isLoggedIn, dispatch, navigate, adminIsError]);
  
  
  
  if (adminIsLoading) {
      return <Spinner/>
  }

  return (
    <div className='admins-page'>
      <div className='admins-page-container'>
        <div className="admins-page-header">
        <h4>Admins</h4>
        <button type="button" class="btn btn-primary" onClick={()=>navigate("/create-admin")}>Ajouter un Admin</button>
        </div>
        <div className='admins-table table-responsive'>

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
    {admins?.map(admin=><tr key={admin.adminId}>
      <td onClick={()=>navigate(`/admins/${admin.adminId}`)}>{admin.adminId}</td>
      <td>{admin.name}</td>
      <td>{admin.number}</td>
      <td>{admin.email}</td>
    </tr>)}
  </tbody>
</table>
        </div>
      </div>
    </div>
  )
}
