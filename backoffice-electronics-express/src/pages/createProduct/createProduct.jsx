import React from 'react'
import { useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AutoComplete } from "rsuite";


import './createProduct.css'

import { createProduct, reset } from '../../features/product/productSlice'
import { getAllCategories } from '../../features/category/categorySlice'
import Spinner from '../../components/spinner/spinner.component'

export default function CreateProduct() {
  const alert = useAlert()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.admins);

  const { productIsError, productISuccess, productIsLoading,
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

    if (productCreated) {
      setProductData({
        categoryId: null,
        productName: "",
        productPrice: 0,
        productDescription: "",
        files: [],
      })

      alert.info("Produit créé avec succes")
      navigate("/products")
    }

    dispatch(getAllCategories());

    dispatch(reset());
  }, [isLoggedIn, dispatch, navigate, productIsError, productCreated]);


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
    if (!categoryId || !productName || !productPrice) {
      alert.error("Le nom, la catégories, le prix ne peuvent être vide");
      return;
    }


    const productToCreate = {
      categoryId,
      productName,
      productPrice,
      productDescription,
    };

    const json = JSON.stringify(productToCreate);
    const blob = new Blob([json], {
      type: 'application/json'
    });

    var formData = new FormData();
    formData.append('product', blob);
    formData.append('files', files);

    await dispatch(createProduct(formData));
  }

  const autoList = categories.map(
    (category) => category.categoryId + " " + category.categoryName
  );


  if (productIsLoading || categoryIsLoading) {
    return <Spinner />
  }


  return (
    <div className='create-admin'>
      <form className="row g-3 needs-validation" novalidate>
        <h4>Ajouter un Produit</h4>
        <div className="col-12">
          <label htmlFor="validationCustom02" className="form-label">Choisir la catégorie*:</label>
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
          <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2"
            onChange={handleChange} name='productDescription' value={productDescription}></textarea>
          <label htmlFor="floatingTextarea2">Description du produit:</label>
        </div>
        <div className="col-12">
          <label htmlFor="validationCustom04" className="form-label">Image du produit*:</label>
          <input type="file" className="form-control" name='files'
            onChange={handleFileChange} required />
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Ajouter</button>
        </div>
      </form>
    </div>
  )
}
