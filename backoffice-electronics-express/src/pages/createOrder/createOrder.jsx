import React from 'react'
import { useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AutoComplete } from "rsuite";


import './createOrder.css'

import { createOrder, reset } from '../../features/order/orderSlice'
import { createLineItem, clearLineItems, deleteLineItem } from '../../features/lineItem/lineItemSlice'
import { getAllProducts1 } from '../../features/product/productSlice'
import { getAllUsers } from '../../features/customer/customerSlice'

import Spinner from '../../components/spinner/spinner.component'
import OrderItem from '../../components/orderItem/orderItem'

export default function CreateOrder() {
    const alert = useAlert()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoggedIn} = useSelector((state) => state.admins);
    
    const { products, productIsError, productISuccess, productIsLoading,
        productMessage, productCreated } = useSelector((state) => state.products);
    
    const { lineItems, lineItemIsError, lineItemISuccess, lineItemIsLoading,
        lineItemMessage, lineItemCreated } = useSelector((state) => state.lineItems);
    
    const {  orders, orderIsError, orderISuccess, orderIsLoading,
        orderMessage, orderCreated } = useSelector((state) => state.orders);
    
    const {  customers, customerIsError, customerISuccess, customerIsLoading,
        customerMessage, customerCreated } = useSelector((state) => state.customers);

    const [orderData, setOrderData] = useState({
        customerId: null,
        address: {
            addressCity: "",
            addressLine1: "",
            addressLine2: "",
        },
    });

    const [lineItemData, setLineItemData] = useState({
        productId: null,
        lineItemQuantity: 1,
    })

    const [autoCompleteProductValue, setAutoCompleteProductValue] = useState("")

    const { customerId, address } = orderData;
    const { productId, lineItemQuantity } = lineItemData;
    


    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login")
        }

        if (orderIsError) {
            alert.error(orderMessage);
        }

        if (lineItemIsError) {
            alert.error(lineItemMessage);
        }

        if (orderCreated) {
            setOrderData({
                customerId: null,
                address: {
                    addressCity: "",
                    addressLine1: "",
                    addressLine2: "",
                },
            })

            dispatch(clearLineItems());
            alert.info("Commande créé avec succes")
            navigate("/orders")
        }

        dispatch(getAllProducts1());
        dispatch(getAllUsers());

        dispatch(reset());
    }, [isLoggedIn, dispatch, navigate, orderIsError, orderCreated]);


    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setOrderData((prevState) => ({
        address: {
            ...prevState.address,
            [name]: value,
        }
        }));
    }; 


    const handleAddLineItem = async(evt) => {
        evt.preventDefault();
        if (!productId || lineItemQuantity < 1) {
            alert.error("Veillez choisir un produit");
            return;
        }

        await dispatch(createLineItem(lineItemData))
        setLineItemData({
            productId: null,
            lineItemQuantity: 1,
        })

        setAutoCompleteProductValue("")

    }

    
    
    const handleSubmit = async (evt) => {
        evt.preventDefault();

        const items = lineItems?.map(lineItem => lineItem.lineItemId);
    

        if (!customerId || !address.addressCity || !address.addressLine1 || lineItems.length<1) {
            alert.error("Le client, la ville, le quartier ou les articles ne peuvent être vide");
            return;
        }
        
        const orderToCreate = {
                customerId,
                address,
                lineItemIds:items,
        };
        
    await dispatch(createOrder(orderToCreate));
    }

    const autoListCustomer = customers.map(
        (customer) => customer.customerId + " " + customer.name
    );
    
    const autoListProducts = products?.content?.map(
        (product) => product.productId + " " + product.productName
      );


    if (productIsLoading || customerIsLoading || orderIsLoading) {
        return <Spinner/>
    }


return (
<div className='create-admin'>
<form className="row g-3 needs-validation" novalidate>
<h4>Ajouter une commande</h4>
<div className="add-product-products-list">
    <div className="add-product">
    <h4>Ajouter des produits</h4>
    <div className='row add-product'>
    <div className='col-12 col-sm-6'>
    <label htmlFor="quantity" className="form-label">Article</label>
    <AutoComplete
            data={autoListProducts}
            value = {autoCompleteProductValue}
            onChange = {(value, evt)=>{
                setAutoCompleteProductValue(value)
            }}
            onSelect={(item, evt) => {
                const id = item.split(" ")[0];
                setLineItemData(prev => ({
                    ...prev,
                    productId: id,
                }))
            }}
    />
    </div>
      
<div className="mb-3 col-12 col-sm-3">
<label htmlFor="quantity" className="form-label">Quantité</label>
<input type="number" min="1" className="form-control" name='quantity' value={lineItemQuantity}
  onChange={
      (evt) => {
          setLineItemData(prev => ({
        ...prev,
        lineItemQuantity: evt.target.value,
    }))}
  } />
</div>
<div className="mb-3 col-12 col-sm-3">   
  <button type="button" className="btn btn-success mt-4" onClick={handleAddLineItem}>Ajouter</button>
</div>
</div>
    </div>
    <div className="products-list">
        {
            lineItems?.map(lineItem=><OrderItem item={lineItem} key={lineItem.lineItemId}/>)
        }
    </div>

</div>

<div className="choose-customer">
<label htmlFor="quantity" className="form-label">Choisir le client:</label>
    <AutoComplete
            data={autoListCustomer}
            onSelect={(item, evt) => {
                const id = item.split(" ")[0];
                setOrderData(prev => ({
                    ...prev,
                    customerId: id,
                }))
            }}
      />
</div>

<div className="enter-address">
<h4>Renseigner l'adresse</h4>
<div className="col-12">
    <label htmlFor="addressCity" className="form-label">Ville*:</label>
    <input type="text" className="form-control" name='addressCity' placeholder='Entrer la ville' 
     onChange={handleChange} value={address.addressCity} required />
</div>
<div className="col-12">
    <label htmlFor="addressLine1" className="form-label">Quartier*:</label>
    <input type="text" className="form-control" name='addressLine1' placeholder='Entrer le quartier'
     onChange={handleChange} value={address.addressLine1} required />
</div>
<div className="col-12">
    <label htmlFor="addressLine2" className="form-label">Autre descriptif:</label>
    <input type="text" className="form-control" name='addressLine2' placeholder='Par exemple face a la pharmacie st Marie'
     onChange={handleChange} value={address.addressLine2}  />
</div>
</div>

  <div className="col-12">
    <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Ajouter</button>
  </div>
</form>
    </div>
  )
}
