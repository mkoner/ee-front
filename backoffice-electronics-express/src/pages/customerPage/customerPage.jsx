import React from 'react'
import { useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'


import './customerPage.css'

import { updateUser, reset, getUserById } from '../../features/customer/customerSlice'
import Spinner from '../../components/spinner/spinner.component'

export default function CustomerPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { isLoggedIn, adminMessage } = useSelector((state) => state.admins)


    const { selectedCustomer, customerIsError, customerISuccess, customerIsLoading,
        customerMessage, customerCreated } = useSelector((state) => state.customers);

    const [customerData, setCustomerData] = useState({
        name: "",
        number: "",
        email: "",
        password: "",
        confirmedPassword: "",
    });

    const { name, number, email, password, confirmedPassword } = customerData;


    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login")
        }

        if (customerIsError) {
            alert.error(customerMessage);
        }

        if (customerISuccess) {
            alert.info("Modification réussi")
        }
        dispatch(getUserById(id));
        setCustomerData(selectedCustomer);

        dispatch(reset());
    }, [isLoggedIn, dispatch, navigate, customerIsError, customerISuccess]);


    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setCustomerData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        if (!(number.replaceAll(" ", "").match('[0-9]'))) {
            alert.error("Verifier le numero");
            return;
        }

        if (!(email.replaceAll(" ", "").match("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])"))) {
            alert.error("Verifier l'email");

            return;
        }

        if (password != confirmedPassword || password.length == 0) {
            alert.error("Echec de confirmation du mot de passe");
            return;
        }

        const customerToUpdate = {
            id: id,
            customer: {
                name,
                number,
                email,
                password,
            }

        };


        customerToUpdate.customer.number = number ? number.replaceAll(" ", ""):"";
        customerToUpdate.customer.email = email ? email.replaceAll(" ", ""):"";

        await dispatch(updateUser(selectedCustomer.customerId, customerToUpdate));

    }


    if (customerIsLoading) {
        return <Spinner />
    }


    return (
        <div className='create-customer'>
            <form className="row g-3 needs-validation" novalidate>
                <h4>Details du client {selectedCustomer.name}</h4>
                <div className="col-12">
                    <label htmlFor="validationCustom01" className="form-label">Prénom et nom:</label>
                    <input type="text" className="form-control" id="validationCustom01" name='name'
                        onChange={handleChange} value={name}  />
                </div>
                <div className="col-12">
                    <label htmlFor="validationCustom02" className="form-label">Numéro:</label>
                    <input type="text" className="form-control" id="validationCustom02" name='number'
                        onChange={handleChange} value={number}  />
                </div>
                <div className="col-12">
                    <label htmlFor="validationCustomUsername" className="form-label">Adresse email:</label>
                    <div className="input-group has-validation">
                        <input type="text" className="form-control" id="validationCustomUsername"
                            onChange={handleChange} name='email' value={email}  />
                    </div>
                </div>
                <div className="col-12">
                    <label htmlFor="validationCustom03" className="form-label">Mot de passe:</label>
                    <input type="password" className="form-control" id="validationCustom03"
                        onChange={handleChange} name='password'  />
                </div>
                <div className="col-12">
                    <label htmlFor="validationCustom04" className="form-label">Confirmer mot de passe:</label>
                    <input type="password" className="form-control" value={confirmedPassword} name='confirmedPassword'
                        onChange={handleChange} />
                </div>
                <div className="col-12">
                    <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Modifier customer</button>
                </div>
            </form>
        </div>
    )
}
