import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5 d-flex justify-content-center">
			<div className="text-white">  	
				<h1>Press button for check if API is running</h1>
				<div className="btn btn-primary" onClick={()=>{actions.checkAPI()}}>Check</div>
				<h1>{store.message}</h1>
			</div>
		</div>
	);
};
