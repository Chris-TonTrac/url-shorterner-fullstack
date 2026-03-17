const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";
const PUBLIC_BASE_URL = import.meta.env.VITE_PUBLIC_BASE_URL ?? "http://localhost:8000";

type ApiErrorPayload = {
	error?: unknown;
	message?: string;
};

type RawUrlCode = {
	id?: string | number;
	shortCode?: string;
	code?: string;
	targetUrl?: string;
	url?: string;
	createdAt?: string;
	created_at?: string;
	created?: string;
	clicks?: number;
	clickCount?: number;
};

type CreateShortCodeResponse = {
	success: {
		shortCode: string;
	};
};

type GetCodesResponse = {
	codes?: RawUrlCode[];
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

const toAuthHeaders = (token: string) => ({
	"Content-Type": "application/json",
	Authorization: `Bearer ${token}`,
});

const normalizeCode = (item: RawUrlCode) => ({
	id: String(item.id ?? ""),
	shortCode: item.shortCode ?? item.code ?? "",
	targetUrl: item.targetUrl ?? item.url ?? "",
	createdAt: item.createdAt ?? item.created_at ?? item.created ?? "",
	clicks: item.clicks ?? item.clickCount ?? 0,
});

export type UrlCode = ReturnType<typeof normalizeCode>;

export const createShortUrl = async (
	token: string,
	payload: { url: string; code?: string }
) => {
	const result = await requestJson<CreateShortCodeResponse>("/shorten", {
		method: "POST",
		headers: toAuthHeaders(token),
		body: JSON.stringify(payload),
	});

	return result.success;
};

export const getUserUrlCodes = async (token: string): Promise<UrlCode[]> => {
	const result = await requestJson<GetCodesResponse>("/codes", {
		method: "GET",
		headers: toAuthHeaders(token),
	});

	if (!result.codes || result.codes.length === 0) {
		return [];
	}

	return result.codes.map(normalizeCode);
};

export const deleteShortUrlById = async (token: string, urlId: string) => {
	return requestJson<{ success: string }>(`/${urlId}`, {
		method: "DELETE",
		headers: toAuthHeaders(token),
	});
};

export const buildPublicShortUrl = (shortCode: string) => {
	return `${PUBLIC_BASE_URL}/${shortCode}`;
};
