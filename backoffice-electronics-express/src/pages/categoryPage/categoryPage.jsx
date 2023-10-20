import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from 'react-alert'


import './categoryPage.css'


import { getCategoryById, updateCategory, reset } from '../../features/category/categorySlice';

export const CategoryPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { isLoggedIn } = useSelector((state) => state.admins);

    const { categoryIsError, selectedcategory, categoryISuccess, categoryIsLoading,
        categoryMessage, categoryCreated } = useSelector((state) => state.categories);

    const [categoryData, setCategoryData] = useState({
        categoryName: "",
    })


    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login")
        }

        if (categoryIsError) {
            alert.error(categoryMessage);
        }

        if (categoryISuccess) {
            alert.info("Modification réussi")
        }

        dispatch(getCategoryById(id));

        setCategoryData(selectedcategory)

        dispatch(reset());
    }, [isLoggedIn, dispatch, navigate, categoryIsError, categoryISuccess, selectedcategory]);


    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setCategoryData(prev => ({
            ...prev,
            [name]: value,
        }))
    }


    const handleSubmit = (evt) => {
        evt.preventDefault();
        const updatedData = {
            id,
            category: {
                categoryName: categoryData.categoryName
            }
        }

        dispatch(updateCategory(updatedData));
    }


    console.log()

    return (
        <div>
            <div className='create-category'>
                <form className="row g-3 needs-validation" novalidate>
                    <h4>Details de la catégorie</h4>
                    <div className="col-12">
                        <label htmlFor="validationCustom01" className="form-label">Nom de la category:</label>
                        <input type="text" className="form-control" id="validationCustom01" name='categoryName'
                            onChange={handleChange} value={categoryData.categoryName} />
                    </div>

                    <div className="col-12">
                        <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Modifier</button>
                    </div>
                </form>
            </div>
        </div>
    );
};