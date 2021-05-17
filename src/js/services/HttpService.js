import $ from "jquery";


const HEADERS = {
	'Content-Type': 'application/json',
	'Accept': 'application/json',
};

const CREDENTIALS = {
	credentials: 'same-origin'
};

export class HttpService {
	static async get(url, requestParams) {
		try {
			return await request(url,'GET', requestParams)
		} catch (e) {
			console.log('Error on GET request: ', e)
			throw e
		}
	}

	static async post(url, requestParams) {
		try {
			return await request(url, 'POST', requestParams)
		} catch (e) {
			console.log('Error on POST request: ', e)
			throw e
		}
	}

	static async put(url, requestParams) {
		try {
			return await request(url, 'PUT', requestParams)
		} catch (e) {
			console.log('Error on PUT request: ', e)
			throw e
		}
	}

	static async delete(url, requestParams) {
		try {
			return await request(url, 'DELETE', requestParams)
		} catch (e) {
			console.log('Error on DELETE request: ', e)
			throw e
		}
	}
}

async function request(url, method = 'GET', requestParams) {
	const config = {
		method,
		CREDENTIALS
	};

	if (method === 'POST' || method === 'PUT') {
		config.headers = HEADERS;
		config.body = JSON.stringify(requestParams)
	}

	const response = await fetch(url, config)

	return await response.json()
}