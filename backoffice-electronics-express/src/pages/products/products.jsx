import React from 'react'
import { useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


import './products.css'

import { getAllProducts, reset } from '../../features/product/productSlice'
import Spinner from '../../components/spinner/spinner.component'

export default function ProductsPage() {
  const alert = useAlert()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.admins);
  
  const {products, productIsError, productISuccess, productIsLoading,
        productMessage } = useSelector((state) => state.products);
    
  const [searchString, setSearchString] = useState({
            categoryId: null,
            pageSize: 20,
            currentPage: 0,
              });
  
  
    useEffect(() => {
      if (!isLoggedIn) {
          navigate("/login")
      }

      const string =`?pageSize=${searchString.pageSize}&currentPage=${searchString.currentPage}`
      dispatch(getAllProducts(string));

      if (productIsError) {
          alert.error(productMessage);
      }

      dispatch(reset());
    }, [isLoggedIn, dispatch, navigate, productIsError]);
  
  
  
  if (productIsLoading) {
      return <Spinner/>
  }

  return (
    <div className='products-page'>
      <div className='products-page-container'>
        <div className="products-page-header">
        <h4>Articles</h4>
        <button type="button" className="btn btn-primary" onClick={()=>navigate("/create-product")}>Ajouter un Article</button>
        </div>
        <div className='products-table table-responsive'>

<table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Nom</th>
      <th scope="col">Prix</th>
      <th scope="col">Catégorie</th>
    </tr>
  </thead>
  <tbody>
  {products.content?.map(product=><tr key={product.productId}>
      <td>{product.productId}</td>
      <td>{product.productName}</td>
      <td>{product.productPrice}</td>
      <td>{product.category.categoryName}</td>
    </tr>)}
  </tbody>
</table>
        </div>
      </div>
    </div>
  )
}
