import { store } from "../store";
import {setTokenExpired} from "../actions/auth";
import {PlainObject} from "../types/interfaces/PlainObject";

interface Config {
	method: string,
	CREDENTIALS: PlainObject,
	headers: PlainObject | null | undefined,
	body: string | null | undefined
}

const CREDENTIALS = {
	credentials: "same-origin"
};

export class HttpService {
	static async get(url: string, requestParams: PlainObject) {
		try {
			return await request(url,"GET", requestParams)
		} catch (e) {
			console.log("Error on GET request: ", e)
			throw e
		}
	}

	static async post(url: string, requestParams: PlainObject) {
		try {
			return await request(url, "POST", requestParams)
		} catch (e) {
			console.log("Error on POST request: ", e);
			throw e
		}
	}

	static async put(url: string, requestParams: PlainObject) {
		try {
			return await request(url, "PUT", requestParams)
		} catch (e) {
			console.log("Error on PUT request: ", e)
			throw e
		}
	}

	static async delete(url: string, requestParams: PlainObject) {
		try {
			return await request(url, "DELETE", requestParams)
		} catch (e) {
			console.log("Error on DELETE request: ", e)
			throw e
		}
	}

	static async postSignOut(url: string) {
		try {
			return await request(url, "POST", {}, true)
		} catch (e) {
			console.log("Error on POST request: ", e)
			throw e
		}
	}
}

async function request(url: string, method: string = "GET", requestParams: PlainObject, withoutResult: boolean = false) {
	const config: Config = {
		body: undefined,
		headers: undefined,
		method,
		CREDENTIALS
	};

	let HEADERS: PlainObject = {
		"Content-Type": "application/json",
		"Accept": "application/json",
	};

	const state = store.getState();
	const {
		userData
	}: PlainObject = state.auth;
	const token: string = userData && userData.token;

	if (token) {
		HEADERS["Authorization"] = token;
	}

	config.headers = HEADERS;

	if (method === "POST" || method === "PUT") {
		config.body = JSON.stringify(requestParams)
	}

	const response = await fetch(url, config);

	if (!response.ok) {
		if (response?.status === 401) {
			store.dispatch<any>(setTokenExpired());
			throw ("token expired");
		}
		return response.status

	}

	return !withoutResult ? await response.json() : null;

}