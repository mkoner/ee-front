import React from 'react'
import { useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


import './createAdmin.css'

import { createUser, reset } from '../../features/admin/adminSlice'
import Spinner from '../../components/spinner/spinner.component'

export default function CreateAdmin() {
    const alert = useAlert()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoggedIn, adminIsError, adminISuccess, adminIsLoading,
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

        if (adminCreated) {
            setAdminData({
                name: "",
                number: "",
                email: "",
                password: "",
                confirmedPassword: "",
            })

            alert.info("Admin créé avec succes")
        }

        dispatch(reset());
    }, [isLoggedIn, dispatch, navigate, adminIsError, adminCreated]);


    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setAdminData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    };
    
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        if (!name || !number || !email || !password) {
            alert.error("Le nom, l'email, le numéro ou le mot de passe ne peuvent être vide");
            return;
          }
      
          if (!(number.replaceAll(" ", "").match('[0-9]'))){
            alert.error("Verifier le numero");
            return;
          }
      
          if (!(email.replaceAll(" ", "").match("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])"))){
            alert.error("Verifier l'email");
            
            return;
          }
      
          if (password != confirmedPassword || password.length == 0) {
            alert.error("Echec de confirmation du mot de passe");
            return;
          }
      
          const adminToCreate = {
            name,
            number,
            email,
            password,

          };
      
          adminToCreate.number = number.replaceAll(" ", "");
          adminToCreate.email = email.replaceAll(" ", "");
          
        await dispatch(createUser(adminToCreate));

    }


    if (adminIsLoading) {
        return <Spinner/>
    }


  return (
<div className='create-admin'>
<form className="row g-3 needs-validation" novalidate>
<h4>Ajouter un admin</h4>
  <div className="col-12">
    <label htmlFor="validationCustom01" className="form-label">Prénom et nom*:</label>
    <input type="text" className="form-control" id="validationCustom01" name='name' 
     onChange={handleChange} value={name} required />
  </div>
  <div className="col-12">
    <label htmlFor="validationCustom02" className="form-label">Numéro*:</label>
    <input type="text" className="form-control" id="validationCustom02" name='number' 
     onChange={handleChange} value={number} required />
  </div>
  <div className="col-12">
    <label htmlFor="validationCustomUsername" className="form-label">Adresse email*:</label>
    <div className="input-group has-validation">
      <input type="text" className="form-control" id="validationCustomUsername" 
       onChange={handleChange} name='email' value={email} required />
    </div>
  </div>
  <div className="col-12">
    <label htmlFor="validationCustom03" className="form-label">Mot de passe*:</label>
    <input type="password" className="form-control" id="validationCustom03" 
     onChange={handleChange} name='password' value={password} required />
  </div>
  <div className="col-12">
    <label htmlFor="validationCustom04" className="form-label">Confirmer mot de passe*:</label>
    <input type="password" className="form-control" value={confirmedPassword} name='confirmedPassword' 
     onChange={handleChange} required />
  </div>
  <div className="col-12">
    <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Ajouter</button>
  </div>
</form>
    </div>
  )
}
