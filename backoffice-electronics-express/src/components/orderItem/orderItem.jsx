import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate, Outlet, Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { deleteLineItem } from '../../features/lineItem/lineItemSlice';

import './orderItem.css';

const OrderItem = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const deleteItem = async (id) => {
    await dispatch(deleteLineItem(id));
  }

  return (
    <div className='cart-item'>
    <img src={`data:image/*;base64,${item.product.files[0].data}`} alt='item' />
    <div className='item-details'>
      <span className='name'>{item.product.productName}</span>
      <span className='price'>
        {item.lineItemQuantity} x {item.product.productPrice}
      </span>
      </div>
      <div className="line-item-price">
      {item.lineItemPrice}
    </div>
    <div className="remove">
      <i class="bi bi-trash" onClick={()=>deleteItem(item.lineItemId)}></i>
    </div>
  </div>
  )
}

export default OrderItem;