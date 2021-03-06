 //const BASE_API_URL = "http://localhost:8080/api/"
 const BASE_API_URL = "https://boxinator-springboot-backend.herokuapp.com/api/"

//USER

//Gets all users from API
export const getAllUsers = async() => {
	const response = await fetch(`${BASE_API_URL}users`,{
		method: 'GET',
		headers: {
			'Accept':'*/*',
			'Authorization': `Bearer ${sessionStorage.getItem('authentication')}`,
			'mode':'cors'
		},
	})
	return response.json()
}
//Posts a new User to the API
export const postNewUser = (post) => {
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${sessionStorage.getItem('authentication')}`,
			'mode':'cors'
		},
        body: JSON.stringify(post)
	}
	return fetch(`${BASE_API_URL}users`, requestOptions)
		.then(response => response.json())
}
//Get a user by their email
export const getUserByEmail = (email) => {
	return fetch(`${BASE_API_URL}users/getByEmail/${email}`,{
		method: 'GET',
		headers: {
			'Accept':'*/*',
			'Authorization': `Bearer ${sessionStorage.getItem('authentication')}`,
			'mode':'cors'
		}
	
	})
	.then(result => result.json())
}
//Update a user with a new user object
export const updateUser = (updatedUser) => {
	const response = fetch(`${BASE_API_URL}users`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${sessionStorage.getItem('authentication')}`,
			'mode':'cors'
		},
		body: JSON.stringify(updatedUser)})
	return response.json()
} 

//ORDER

//Gets all orders registered to a specific user email
export const getOrdersByUserEmail = (email) => {
	return fetch(`${BASE_API_URL}orders/getByUserEmail/${email}`,{
		method: 'GET',
		headers: {
			'Accept':'*/*',
			 'Authorization': `Bearer ${sessionStorage.getItem('authentication')}`,
			 'mode':'cors'
		},
	
	})
	.then(result => result.json())
} 

//Gets all orders registered to a specific user Id 
export const getOrdersByUserId = (userId) => {
    return fetch(`${BASE_API_URL}orders/getByUserId/${userId}`
	,{
		method: 'GET',
		headers: {
			'Accept':'*/*',
			// 'Authorization': `Bearer ${sessionStorage.getItem('authentication')}`
			'mode':'cors'
		},
	})
	.then(response => response.json())
} 

//Gets all orders stored in the API
export const getAllOrders = async() => {
	const response = await fetch(`${BASE_API_URL}orders`
	,{
		method: 'GET',
		headers: {
			'Accept':'*/*',
			// 'Authorization': `Bearer ${sessionStorage.getItem('authentication')}`
			'mode':'cors'
		},
	})
	return response.json()
}
//Updates an order with matching email
export const updateOrderByEmail = async(email) => {
	const response = await fetch(`${BASE_API_URL}orders/updateUserOnOrder/${email}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			 'Authorization': `Bearer ${sessionStorage.getItem('authentication')}`,
			 'mode':'cors'
		},
		body: JSON.stringify(email)})
	return response.json()
}

//Posts new order
export const createNewOrder = (newOrder) => {
	const response = fetch(`${BASE_API_URL}orders`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			// 'Authorization': `Bearer ${sessionStorage.getItem('authentication')}`,
			'mode':'cors'
		},
        body: JSON.stringify(newOrder)
	})
	return response.json()
} 

//Email Service
export const sendOrderInformation = (orderInformation) => {
    return fetch(`${BASE_API_URL}sendEmail`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${sessionStorage.getItem('authentication')}`,
			'mode':'cors'
		},
        body: JSON.stringify(orderInformation)
	})
} 

//SHIPMENT

//Gets all shipments from the API
export const getAllShipments = async() => {
	const response = await fetch(`${BASE_API_URL}shipments`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${sessionStorage.getItem('authentication')}`,
			'mode':'cors'
		},
	})
	return response.json()
}

//Gets a specific shipment by it Id
export const getShipmentById = async (orderId) => {
	const response = await fetch(`${BASE_API_URL}shipments/${orderId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${sessionStorage.getItem('authentication')}`,
			'mode':'cors'
			
			
		},
	})
	return response.json()
} 

//Posts a new shipment to the database
export const createNewShipment = (newShipment) => {
    return fetch(`${BASE_API_URL}shipments`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${sessionStorage.getItem('authentication')}`,
			'mode':'cors'
		},
        body: JSON.stringify(newShipment)
	})
} 

//Posts a new shipmentStatus to the database
export const postNewShipmentStatusHistory = (statusId, shipmentId) => {
	const date = Number(new Date()).valueOf();
	console.log("Timestamp from APi post " + date)
    return fetch(`${BASE_API_URL}shipmentstatushistory`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${sessionStorage.getItem('authentication')}`,
			'mode':'cors'
		},
        body: JSON.stringify({
			"timeStamp":  "value",
			"shipment": {"id": shipmentId},
			"status":{"id": statusId}
		})
	})
} 

//Gets a shipments status history, from a specific Id 
export const getShipmentStatusHistoryByShipmentId = async(id) => {
	const response = await fetch(`${BASE_API_URL}shipmentstatushistory/getShipmentStatusHistoryByShipmentId/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${sessionStorage.getItem('authentication')}`,
			'mode':'cors'
		},
	})
	return response.json()
} 

//Updates a Shipment based upon a new shipment object
export const updateShipment = async(updatedShipment) => {
	const response = await fetch(`${BASE_API_URL}shipments`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${sessionStorage.getItem('authentication')}`,
			'mode':'cors'
		},
		body: JSON.stringify(updatedShipment)})
	return response.json()
} 

//Updates the status of a shipment
export const updateShipmentStatus = async(id, status) => {
	const response = await fetch(`${BASE_API_URL}shipments/updateShipmentStatus/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${sessionStorage.getItem('authentication')}`,
			'mode':'cors'
		},
		body: JSON.stringify(status)})
	return response.json()
} 


//COUNTRY


//Updates the multiplier of a specific country
export const updateCountryMultiplier = (updatedCountry) => {
    return fetch(`${BASE_API_URL}countries`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${sessionStorage.getItem('authentication')}`,
			'mode':'cors'
		},
		body: JSON.stringify(updatedCountry)
	})
} 
//Gets all the countries stored in the API
export const getAllCountries = () => {	
	return fetch(`${BASE_API_URL}countries`,{
		method: 'GET',
		headers: {
			'Accept':'*/*',
			'mode':'cors',
			'Access-Control-Allow-Origin' :'*'
			
		},
	})
	.then(result => result.json())
}

//PACKAGE

//Gets all the package types stored in the API
export const getPackageTypes = () => {
	return fetch(`${BASE_API_URL}packages`,{
		method: 'GET',
		headers: {
			// 'Accept':'*/*',
			'mode':'no-cors',
			// 'Access-Control-Allow-Origin' :'Accept'
			
		},
	})
	.then(result => result.json())
}

