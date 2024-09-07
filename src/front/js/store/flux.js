
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			isLogged: true,
			message: null,
			userList: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			checkSession: () => {
				var session = localStorage.getItem("token");
				if(!session)
					setStore({...getStore(), isLogged: false })
			},
			checkAPI: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/checkStatus")
					const data = await resp.json()
					setStore({...getStore(), message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
					setStore({...getStore(), message: "API off, check the connection"})
				}
			},
			register: async (formData) => {
				try{
					const response = await fetch(process.env.BACKEND_URL+"/register", {
						method: "POST",
						body: JSON.stringify(formData),
						headers:{
							"Content-type": "application/json"
						}
					})
					let data = await response.json()
					return data
					
				}catch(e){
					console.error("Error in registration:", e)
				}
			},
			login: async (loginForm) => {
				try{
					const response = await fetch(process.env.BACKEND_URL+"/login", {
						method: "POST",
						body: JSON.stringify(loginForm),
						headers:{
							"Content-type": "application/json"
						}
					})
					const data = await response.json()
					
					if (response.ok){
						localStorage.setItem("token", data.access_token)
						localStorage.setItem("username", data.username)			
						setStore({...getStore(), isLogged: true })			
					} 
					return response;

				}catch(e){
					console.error(e)
				}
			}, getList: async () => {
				const token = localStorage.getItem("token")
				if(!token){
					alert("first login to get token")
					return
				}
				try{
					const response = await fetch(process.env.BACKEND_URL+"/users", {
						headers:{
							Authorization: `Bearer ${token}`
						}
					})
					const result = await response.json()

					if(result.msg==="Token has expired"){
						getActions().logout()
					}
					
					if(result.User_list){
						setStore({...getStore(), userList: result.User_list})
					}
				}catch(e){
					console.error(e)
				}
			}, logout: () => {
				localStorage.removeItem("token");
				localStorage.removeItem("username");
				setStore({...getStore(), isLogged: false })			
			}
		}
	};
};

export default getState;
