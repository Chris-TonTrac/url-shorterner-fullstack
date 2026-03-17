const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

type ApiErrorPayload = {
	error?: unknown;
	message?: string;
};

const getErrorMessage = (payload: ApiErrorPayload, fallback: string) => {
	if (typeof payload.error === "string") return payload.error;
	if (typeof payload.message === "string") return payload.message;
	return fallback;
};

const requestJson = async <T>(path: string, init: RequestInit): Promise<T> => {
	let response: Response;

	try {
		response = await fetch(`${API_BASE_URL}${path}`, init);
	} catch {
		throw new Error("Unable to reach the API. Check backend server and API base URL.");
	}

	const bodyText = await response.text();

	let payload: unknown = null;
	if (bodyText) {
		try {
			payload = JSON.parse(bodyText);
		} catch {
			payload = bodyText;
		}
	}

	if (!response.ok) {
		const errorPayload = (payload ?? {}) as ApiErrorPayload;
		throw new Error(getErrorMessage(errorPayload, `Request failed with status ${response.status}`));
	}

	return payload as T;
};

export type SignUpPayload = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};

export type LoginPayload = {
	email: string;
	password: string;
};

type SignUpResponse = {
	data: {
		userId: string;
	};
};

type LoginResponse = {
	token: string;
};

export const signUpUser = async (payload: SignUpPayload) => {
	const result = await requestJson<SignUpResponse>("/user/sign-up", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	return result.data;
};

export const loginUser = async (payload: LoginPayload) => {
	const result = await requestJson<LoginResponse>("/user/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	return result;
};
