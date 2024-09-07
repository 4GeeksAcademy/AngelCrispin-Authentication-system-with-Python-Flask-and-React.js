import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const NotAllowed = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5 d-flex justify-content-center">
			<div className="text-white">  	
				<h1>Not Allowed</h1>
			</div>
		</div>
	);
};
