import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const NotFound = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5 d-flex justify-content-center">
			<div className="text-white">  	
				<h1>Not Found</h1>
			</div>
		</div>
	);
};
