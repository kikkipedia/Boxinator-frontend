const BASE_API_URL = "http://localhost:8080/api/"
//const BASE_API_UR = "https://boxinator-server.herokuapp.com/api/"

//USERS
export const getAllUsers = async () => {
    const result = await fetch(`${BASE_API_URL}users`)
    return result.json()
}

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

//ORDERS
export const getOrdersByUserId = (userId) => {
    return fetch(`${BASE_API_URL}orders/getByUserId/${userId}`)
	.then(response => response.json())
} 

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

export const getAllShipments = async() => {
	const response = await fetch(`${BASE_API_URL}shipments`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
	return response.json()
}

//SHIPMENTS
export const getShipmentById = async (orderId) => {
	const response = await fetch(`${BASE_API_URL}shipments/${orderId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
	return response.json()
} 

export const createNewShipment = (newShipment) => {
    return fetch(`${BASE_API_URL}shipments`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
        body: JSON.stringify(newShipment)
	})
} 

export const getShipmentStatusHistoryByShipmentId = async(shipmentId) => {
	const response = await fetch(`${BASE_API_URL}shipmentstatushistory?shipment_id=${shipmentId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
	return response.json()
} 

export const updateShipment = async(updatedShipment) => {
	const response = await fetch(`${BASE_API_URL}shipments`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(updatedShipment)})
	return response.json()
} 

export const updateShipmentStatus = async(id, status) => {
	const response = await fetch(`${BASE_API_URL}shipments/updateShipmentStatus/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(status)})
	return response.json()
} 

//COUNTRIES
export const updateCountryMultiplier = (updatedCountry) => {
    return fetch(`${BASE_API_URL}countries`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(updatedCountry)
	})
} 

export const getAllCountries = () => {	
	return fetch(`${BASE_API_URL}countries`)
	.then(result => result.json())
}

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
