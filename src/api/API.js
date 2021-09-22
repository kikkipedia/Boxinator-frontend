const BASE_API_URL = "http://localhost:8080/api/"
//const BASE_API_UR = "https://boxinator-server.herokuapp.com/api/"


//Gets all users from API
export const getAllUsers = async() => {
	const response = await fetch(`${BASE_API_URL}users`)
	return response.json()
}
//Posts a new User to the API
export const postNewUser = (post) => {
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
        body: JSON.stringify(post)
	}
	return fetch(`${BASE_API_URL}users`, requestOptions)
		.then(response => response.json())
}
//Gets all orders registered to a specific user email
export const getOrdersByUserEmail = (email) => {
	return fetch(`${BASE_API_URL}orders/getByUserEmail/${email}`)
	.then(result => result.json())
} 
//Gets all orders registered to a specific user Id 
export const getOrdersByUserId = (userId) => {
    return fetch(`${BASE_API_URL}orders/getByUserId/${userId}`)
	.then(response => response.json())
} 
//Gets all orders stored in the API
export const getAllOrders = async() => {
	const response = await fetch(`${BASE_API_URL}orders`)
	return response.json()
}


export const createNewOrder = (newOrder) => {
	const response = fetch(`${BASE_API_URL}orders`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
        body: JSON.stringify(newOrder)
	})
	return response.json()
} 
//Gets all shipments from the API
export const getAllShipments = async() => {
	const response = await fetch(`${BASE_API_URL}shipments`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
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
		},
        body: JSON.stringify(newShipment)
	})
} 
//Posts a new shipment to the database
export const postNewShipmentStatusHistory = (statusId, shipmentId) => {
	const date = Number(new Date).valueOf();
	console.log("Timestamp from APi post " + date)
    return fetch(`${BASE_API_URL}shipmentstatushistory`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
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
		},
		body: JSON.stringify(status)})
	return response.json()
} 

//Updates the multiplier of a specific country
export const updateCountryMultiplier = (updatedCountry) => {
    return fetch(`${BASE_API_URL}countries`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(updatedCountry)
	})
} 
//Gets all the countries stored in the API
export const getAllCountries = () => {	
	return fetch(`${BASE_API_URL}countries`)
	.then(result => result.json())
}
//Gets all the package types stored in the API
export const getPackageTypes = () => {
	return fetch(`${BASE_API_URL}packages`)
	.then(result => result.json())
}

export const getUserByEmail = (email) => {
	return fetch(`${BASE_API_URL}users/getByEmail/${email}`)
	.then(result => result.json())
}

export const updateUser = (updatedUser) => {
	const response = fetch(`${BASE_API_URL}users`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(updatedUser)})
	return response.json()
} 

export const sendOrderInformation = (orderInformation) => {
    return fetch(`${BASE_API_URL}sendEmail`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
        body: JSON.stringify(orderInformation)
	})
} 

