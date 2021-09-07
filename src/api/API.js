const BASE_API_URL = "http://localhost:8080/api/"

export const getOrdersByUserId = (userId) => {
    return fetch(`${BASE_API_URL}orders?user_id=${userId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
} 

export const createNewOrder = (newOrder) => {
    return fetch(`${BASE_API_URL}shipments`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
        body: JSON.stringify(newOrder)
	})
} 

export const getAllShipments = () => {
    return fetch(`${BASE_API_URL}shipments`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
} 

export const getShipmentByOrderId = (orderId) => {
    return fetch(`${BASE_API_URL}shipments?order_id=${orderId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
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

export const getShipmentStatusHistoryByShipmentId = (shipmentId) => {
    return fetch(`${BASE_API_URL}shipmentstatushistory?shipment_id=${shipmentId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
} 

export const updateShipmentStatus = (updatedShipment) => {
    return fetch(`${BASE_API_URL}shipments`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(updatedShipment)
	})
} 

export const updateCountryMultiplier = (updatedCountry) => {
    return fetch(`${BASE_API_URL}countries`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(updatedCountry)
	})
} 
