import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import './home.css'

import { logout } from '../../features/admin/adminSlice';

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, adminMessage } = useSelector((state) => state.admins)
  useEffect(() => {
    if (!isLoggedIn || adminMessage == "Not authorized") {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]); 

  const handleLogOut = async() => {
   await  dispatch(logout());
    navigate("/login");
  };
  

  return (
    <div className='home-page'>
        <nav>
            <ul>
                  <li className='hp-nav-item'><Link to={"/admins"}>Admins</Link></li>
                  <li className='hp-nav-item'><Link to={"/customers"}>Client</Link></li>
                  <li className='hp-nav-item'><Link to={"/products"}>Article</Link></li>
                  <li className='hp-nav-item'><Link to={"/categories"}>Categories</Link></li>
                  <li className='hp-nav-item'><Link to={"/orders"}>Commandes</Link></li>
                  <li className='hp-nav-item' onClick={handleLogOut}><Link to={""}>Déconnexion</Link></li>
            </ul>
        </nav>
    </div>
  )
}
