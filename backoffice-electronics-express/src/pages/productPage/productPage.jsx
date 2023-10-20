import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from 'react-alert'
import { AutoComplete } from "rsuite";

import './productPage.css'


import { getProductById, updateProduct, reset, addFiles, deleteFile } from '../../features/product/productSlice';
import { getAllCategories } from '../../features/category/categorySlice';
import Spinner from '../../components/spinner/spinner.component';

export const ProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { isLoggedIn } = useSelector((state) => state.admins);

    const { productIsError, selectedProduct, productISuccess, productIsLoading,
        productMessage, productCreated } = useSelector((state) => state.products);

    const { categories, categoryIsError, categoryISuccess, categoryIsLoading,
        categoryMessage } = useSelector((state) => state.categories);

    const [productData, setProductData] = useState({
        categoryId: null,
        productName: "",
        productPrice: 0,
        productDescription: "",
        files: [],
    });

    const { categoryId, productName, productPrice, productDescription, files } = productData;


    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login")
        }

        if (productIsError) {
            alert.error(productMessage);
        }

        if (categoryIsError) {
            alert.error(categoryMessage);
        }

        if (productISuccess) {
            alert.info("Modification réussie")
        }

        dispatch(getProductById(id));
        dispatch(getAllCategories());

        setProductData(selectedProduct);

        dispatch(reset());
    }, [isLoggedIn, dispatch, navigate, productIsError, productISuccess]);


    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setProductData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (evt) => {
        setProductData((prev) => ({
            ...prev,
            files: evt.target.files[0],
        }))
    }


    const handleSubmit = async (evt) => {
        evt.preventDefault();


        const productToUpdate = {
            id: id,
            product: {
                categoryId,
                productName,
                productPrice,
                productDescription,
            }
        };

        dispatch(updateProduct(productToUpdate));
    }

    const handleRemoveFile = async (evt) => {
        evt.preventDefault();
        const data = {
            pid: selectedProduct.productId,
            fid: selectedProduct.files[0].id,
        }
        dispatch(deleteFile(data));
    }

    const handleAddFile = async (evt) => {
        evt.preventDefault();
        var formData = new FormData();
        formData.append('files', productData.files);
        dispatch(addFiles(selectedProduct.productId, formData));
    }

    const autoList = categories.map(
        (category) => category.categoryId + " " + category.categoryName
    );


    if (productIsLoading || categoryIsLoading) {
        return <Spinner />
    }



    return (
        <div>
            <div className='create-admin'>
                <form className="row g-3 needs-validation" novalidate>
                    <h4>Détail du produit</h4>
                    <div className="col-12">
                        <AutoComplete
                            data={autoList}
                            style={{ width: 224 }}
                            onSelect={(item, evt) => {
                                const id = item.split(" ")[0];
                                setProductData((prev) => ({
                                    ...prev,
                                    categoryId: id,
                                }))
                            }}
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="validationCustom02" className="form-label">Nom du produit*:</label>
                        <input type="text" className="form-control" id="validationCustom02" name='productName'
                            onChange={handleChange} value={productName} required />
                    </div>
                    <div className="col-12">
                        <label htmlFor="validationCustomUsername" className="form-label">Prix du produit*:</label>
                        <div className="input-group has-validation">
                            <input type="number" step="0.01" className="form-control" id="validationCustomUsername"
                                onChange={handleChange} name='productPrice' value={productPrice} required />
                        </div>
                    </div>
                    <div className="form-floating col-12">
                        <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2"
                            onChange={handleChange} name='productDescription' value={productDescription}></textarea>
                        <label htmlFor="floatingTextarea2">Description du produit:</label>
                    </div>
                    <div className="col-12">
                        {selectedProduct.files.length > 0 && <div className="image-display">
                            <label htmlFor="validationCustom04" className="form-label">Image du produit:</label>
                            <div className="image-container">
                                <img className='img-fluid' src={`data:image/*;base64,${selectedProduct.files[0].data}`} alt="article" srcset="" />
                            </div>
                            <button className="btn btn-danger" type="submit" onClick={handleRemoveFile}>Suprimer</button>
                        </div>}
                        {selectedProduct.files.length <= 0 &&<div className="add-image">
                        <label htmlFor="validationCustom04" className="form-label">Ajouter un image:</label>
                            <input type="file" className="form-control" name='files'
                                onChange={handleFileChange} />
                            <button className="btn btn-primary" type="submit" onClick={handleAddFile}>Ajouter image</button>
                        </div>}

                    </div>
                    <div className="col-12">
                        <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Modifier article</button>
                    </div>
                </form>
            </div>
        </div>
    );
};