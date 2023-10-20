import React from 'react'
import { useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, Link } from "react-router-dom";


import './adminPage.css'

import { updateUser, reset, getUserById } from '../../features/admin/adminSlice'
import Spinner from '../../components/spinner/spinner.component'

export default function AdminPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();


    const { isLoggedIn, selectedAdmin, adminIsError, adminISuccess, adminIsLoading,
        adminMessage, adminCreated } = useSelector((state) => state.admins);

    const [adminData, setAdminData] = useState({
        name: "",
        number: "",
        email: "",
        password: "",
        confirmedPassword: "",
    });

    const { name, number, email, password, confirmedPassword } = adminData;


    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login")
        }

        if (adminIsError) {
            alert.error(adminMessage);
        }

        dispatch(getUserById(id));
        setAdminData({
            name: selectedAdmin.name,
            number: selectedAdmin.number,
            email: selectedAdmin.email,
            password: "",
            confirmedPassword: "",
        });

        dispatch(reset());
    }, [isLoggedIn, adminIsError, dispatch]);


    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setAdminData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        console.log(adminData)

        if (!(number.replaceAll(" ", "").match('[0-9]'))) {
            alert.error("Verifier le numero");
            return;
        }

        if (!(email.replaceAll(" ", "").match("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])"))) {
            alert.error("Verifier l'email");

            return;
        }

        if (password != confirmedPassword) {
            alert.error("Echec de confirmation du mot de passe");
            return;
        }

        const adminToUpdate = {
            id: id,
            admin: {
                name,
                number,
                email,
                password,
            }

        };


        adminToUpdate.admin.number = number ? number.replaceAll(" ", ""):"";
        adminToUpdate.admin.email = email ? email.replaceAll(" ", ""):"";

        await dispatch(updateUser(adminToUpdate));

        if (adminISuccess) {
            alert.info("Modification réussi")
        }

    }


    if (adminIsLoading) {
        return <Spinner />
    }


    return (
        <div className='create-admin'>
            <form className="row g-3 needs-validation" novalidate>
                <h4>Details de l'admin {selectedAdmin.name}</h4>
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
                    <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Modifier admin</button>
                </div>
            </form>
        </div>
    )
}
