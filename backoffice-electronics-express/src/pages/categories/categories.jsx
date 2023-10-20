import React from 'react'
import { useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


import './categories.css'

import { getAllCategories, reset } from '../../features/category/categorySlice'
import Spinner from '../../components/spinner/spinner.component'

export default function CategoriesPage() {
  const alert = useAlert()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn, adminIsError, adminISuccess, adminIsLoading,
        adminMessage } = useSelector((state) => state.admins);
    
  const {  categories, categoryIsError, categoryISuccess, categoryIsLoading,
        categoryMessage } = useSelector((state) => state.categories);
  
  
    useEffect(() => {
      if (!isLoggedIn) {
          navigate("/login")
      }

      dispatch(getAllCategories());

      if (categoryIsError) {
          alert.error(categoryMessage);
      }

      dispatch(reset());
    }, [isLoggedIn, dispatch, navigate, categoryIsError]);
  
  
  
  if (categoryIsError) {
      return <Spinner/>
  }

  return (
    <div className='categories-page'>
      <div className='categories-page-container'>
        <div className="categories-page-header">
        <h4>Categories</h4>
        <button type="button" className="btn btn-primary" onClick={()=>navigate("/create-category")}>Ajouter une catégorie</button>
        </div>
        <div className='categories-table table-responsive'>

<table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Nom</th>
    </tr>
  </thead>
  <tbody>
    {categories?.map(category=><tr key={category.categoryId}>
      <td>{category.categoryId}</td>
      <td>{category.categoryName}</td>
    </tr>)}
  </tbody>
</table>
        </div>
      </div>
    </div>
  )
}
