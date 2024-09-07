import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'


export const Login = () => {
	
	const {store,actions} = useContext(Context);
    const navigate = useNavigate();
    const Swal = require('sweetalert2')

    const [loginForm, setLoginForm] = useState({
        username:"",
        password:""
    })

    const handleChangeLoginForm = (e) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    }

    const sendLoginForm = async (e) => {
        e.preventDefault()
        try{
            const response = await actions.login(loginForm)

            if (response?.ok) {
                setLoginForm({
                    username: "",
                    password: ""
                })

                Swal.fire({
                    icon: "success",
                    title: "Welcome",
                    text: "Login succesfull",
                });

                setTimeout(() => {
                    navigate("/private");

                }, 1500)

            } else {
            

                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Login failed",
                });

                console.warn("Login failed")
            }
        }catch(ex){
            console.error("Error during login:", ex);
        }
    }

    const [registerForm, setRegisterForm] = useState({
        username: "",
        email: "",
        password: ""
    })

    const handleChangeRegisterForm = (e) => {
        setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
    }

    const sendRegisterForm = async(e) => {
        e.preventDefault()
        try{
            const data = await actions.register(registerForm)
            
            if (data?.ok) {
                setRegisterForm({
                    username: "",
                    email: "",
                    password: ""
                });

                Swal.fire({
                    icon: "success",
                    title: "Registered",
                    text: "Register succesfull",
                });

                setTimeout(() => {
                    navigate("/login")
                }, 1500)

            } else {

                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Register failed",
                });
                console.error("Register failed");
            }
        }catch(e){
            

            console.error("Error in registration", e);
        }
    }



	return (
		<div className="text-center mt-5 d-flex justify-content-center">
			<div className="main">  	
				<input type="checkbox" id="chk" aria-hidden="true"/>

					<div className="signup">
						<form onSubmit={sendRegisterForm}>
							<label className="labelLogin" htmlFor="chk" aria-hidden="true">Sign up</label>
							<input className="inputLogin" type="text" value={registerForm.username} name="username" placeholder="Username" required="" onChange={handleChangeRegisterForm}/>
							<input className="inputLogin" type="email" value={registerForm.email} name="email" placeholder="Email" required="" onChange={handleChangeRegisterForm}/>
							<input className="inputLogin" type="password" value={registerForm.password} name="password" placeholder="Password" required="" onChange={handleChangeRegisterForm}/>
							<button className="buttonLogin">Sign up</button>
						</form>
					</div>

					<div className="login">
						<form onSubmit={sendLoginForm}>
							<label className="labelLogin" htmlFor="chk" aria-hidden="true">Login</label>
							<input className="inputLogin" type="username" value={loginForm.username} name="username" placeholder="Username" required="" onChange={handleChangeLoginForm}/>
							<input className="inputLogin" type="password" value={loginForm.password} name="password" placeholder="Password" required="" onChange={handleChangeLoginForm}/>
							<button className="buttonLogin">Login</button>
						</form>
					</div>
			</div>
		</div>
	);
};
