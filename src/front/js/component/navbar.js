import React,{useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";import { useNavigate } from "react-router-dom";


export const Navbar = () => {
	const { store, actions } = useContext(Context);
	
	const navigate = useNavigate();

    const handleLogout = () => {
        actions.logout();
		navigate("/");
    };


	return (
		
		<nav className="navbar navbar-dark bg-dark w-100">
			<div className="container d-flex justify-content-between">
				<Link to="/private">
						<div className="btn btn-primary">Go To Private</div>
				</Link>
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Authentication system</span>
				</Link>
				<div className="">
					{!store.isLogged?(<Link to="/login">
						<div className="btn btn-primary">Login / Register</div>
					</Link>):(<div className="btn btn-danger" onClick={()=>handleLogout()}>Logout</div>)}
				</div>
			</div>
		</nav>
	);
};
