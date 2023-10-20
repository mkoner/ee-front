import React from 'react'
import { useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


import './createCategory.css'

import { createCategory, reset } from '../../features/category/categorySlice'
import Spinner from '../../components/spinner/spinner.component'

export default function CreateCategory() {
    const alert = useAlert()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoggedIn } = useSelector((state) => state.admins);

    const {  categories, categoryIsError, categoryISuccess, categoryIsLoading,
        categoryMessage,  categoryCreated} = useSelector((state) => state.categories);

    const [categoryName, setCategoryName] = useState("");



    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login")
        }

        if (categoryIsError) {
            alert.error(categoryMessage);
        }

        if (categoryCreated) {
            setCategoryName("");

            alert.info("Category créé avec succes")
        }

        dispatch(reset());
    }, [isLoggedIn, dispatch, navigate, categoryIsError, categoryCreated]);


    const handleChange = (evt) => {
        setCategoryName(evt.target.value)
    };
    
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        if (!categoryName) {
            alert.error("Entrer le nom de la category");
            return;
        }
        
        const categoryToCreate = {
            categoryName,
        }
           
        await dispatch(createCategory(categoryToCreate));

    }


    if (categoryIsLoading) {
        return <Spinner/>
    }


  return (
<div className='create-category'>
<form className="row g-3 needs-validation" novalidate>
<h4>Ajouter une category</h4>
  <div className="col-12">
    <label htmlFor="validationCustom01" className="form-label">Nom de la category*:</label>
    <input type="text" className="form-control" id="validationCustom01" name='categoryName' 
     onChange={handleChange} value={categoryName} required />
  </div>

  <div className="col-12">
    <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Ajouter</button>
  </div>
</form>
    </div>
  )
}
