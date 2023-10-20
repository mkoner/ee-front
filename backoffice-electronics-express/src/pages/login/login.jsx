import React from 'react'
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import './login.css'

import { login, reset } from '../../features/admin/adminSlice';

import logo from '../../assets/e2logo.jpg'
import Spinner from '../../components/spinner/spinner.component';

export default function Login() {


    const [formData, setFormData] = useState({
        number: "",
        password: "",
      });
    
      const { number, password } = formData;
    
      const navigate = useNavigate();
      const dispatch = useDispatch();
    
      const { isLoggedIn, adminIsError, adminISuccess, adminIsLoading, adminMessage } = useSelector(
        (state) => state.admins
      );
    
      useEffect(() => {
       if (adminIsError) {
          console.log(adminMessage);
        } 
    
        if (adminISuccess) {
          navigate("/");
        }
    
        dispatch(reset());
      }, [isLoggedIn, adminIsError, adminISuccess, adminMessage, navigate, dispatch]);
    
      const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
    
      const handleSubmit = (evt) => {
        evt.preventDefault();
    
        const userData = {
          number,
          password,
        };
    
        dispatch(login(userData));
      };
    
      if (adminIsLoading) {
        return <Spinner/>
      }


    return (
    <div className="container-scroller">
    <div className="container-fluid page-body-wrapper">
    <div className="row">
    <div className='login-page'>
        <div id="logo_center_bar">
            <img src={logo} />
        </div>
        <form className="pt-5">
            <div className="form-group">
                <label
                  htmlFor="email"
                  data-i18n="account.email_or_telephone"
                >
                  Adresse e-mail / numéro de telephone*
                </label>
                <input
                  value={number}
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  id="email_or_telephone"
                  aria-describedby="emailHelp"
                  name="number"
                  required
                />
                <i className="mdi mdi-account"></i>
              </div>
              <div className="form-group ">
                <label htmlFor="password">Mot de passe*</label>
                <input
                  value={password}
                  onChange={handleChange}
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                />
              </div>
              <div className="mt-5 login-btn">
                <input
                  disabled={
                    number.length == 0 ||
                    password.length == 0 ||
                    adminIsLoading
                  }
                  type="button"
                  onClick={handleSubmit}
                  value={adminIsLoading ? "Patientez..." : "Connexion"}
                  className="btn btn-block btn-success btn-lg font-weight-medium"
                  id="login"
                />
            </div>
        </form>
    </div>
    </div>
    </div>
    </div>
  )
}
