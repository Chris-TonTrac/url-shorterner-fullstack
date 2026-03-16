const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";

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
	const response = await fetch(`${API_BASE_URL}${path}`, init);
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
	const result = await requestJson<CreateShortCodeResponse>("/url/shorten", {
		method: "POST",
		headers: toAuthHeaders(token),
		body: JSON.stringify(payload),
	});

	return result.success;
};

export const getUserUrlCodes = async (token: string): Promise<UrlCode[]> => {
	const result = await requestJson<GetCodesResponse>("/url/codes", {
		method: "GET",
		headers: toAuthHeaders(token),
	});

	if (!result.codes || result.codes.length === 0) {
		return [];
	}

	return result.codes.map(normalizeCode);
};

export const deleteShortUrlById = async (token: string, urlId: string) => {
	return requestJson<{ success: string }>(`/url/${urlId}`, {
		method: "DELETE",
		headers: toAuthHeaders(token),
	});
};

export const buildPublicShortUrl = (shortCode: string) => {
	return `${API_BASE_URL}/url/${shortCode}`;
};
