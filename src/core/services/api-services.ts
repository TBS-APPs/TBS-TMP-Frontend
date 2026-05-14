import { Result } from "@/core/types/results/results";
import {
  getFailure,
  ServerFailure,
  TimeOutFailure,
} from "@/core/types/results/failures";
import { getLocale, getTranslations } from "next-intl/server";
import { getAccessToken } from "@/core/utils/cookie-service";

const TIMED_OUT_DURATION = 15000;

export async function callGet<T>(endPoint: string): Promise<Result<T>> {
  return _request<T>({ method: "get", endPoint });
}

export async function callPost<T>(
  endPoint: string,
  body?: string | FormData,
  customHeaders?: Record<string, string>,
): Promise<Result<T>> {
  return _request<T>({
    method: "post",
    endPoint,
    body,
    customHeaders,
  });
}

export async function callPut<T>(
  endPoint: string,
  body: string,
): Promise<Result<T>> {
  return _request<T>({ method: "put", endPoint, body });
}

export async function callDelete<T>(endPoint: string): Promise<Result<T>> {
  return _request<T>({ method: "delete", endPoint });
}

async function _request<T>({
  method,
  endPoint,
  body,
  customHeaders,
}: {
  method: "get" | "post" | "put" | "delete";
  endPoint: string;
  body?: string | FormData;
  customHeaders?: Record<string, string>;
}): Promise<Result<T>> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const url = `${baseUrl}/${endPoint}`;

  console.log("url: " + url);
  const t = await getTranslations();

  try {
    const locale = await getLocale();
    const token = await getAccessToken();

    const isMultipart =
      typeof FormData !== "undefined" && body instanceof FormData;
    const hasBody = body !== undefined;

    const config: RequestInit = {
      method,
      headers: _getHeaders(locale, isMultipart, token, customHeaders, hasBody),
      signal: AbortSignal.timeout(TIMED_OUT_DURATION),
    };

    if (hasBody && method !== "get" && method !== "delete") {
      config.body = body;
    }

    const response = await fetch(url, config);
    let responseData;
    try {
      responseData = await response.json();
    } catch (jsonError) {
      const failure: ServerFailure = {
        type: "server",
        message: t("somethingWrongTryAgain"),
      };
      return { type: "failure", failure };
    }

    const failure = getFailure(t, response.ok, responseData);
    if (failure) {
      return { type: "failure", failure };
    }

    return { type: "success", data: responseData };
  } catch (err) {
    console.error("error", err);
    if (err === "AbortError") {
      const failure: TimeOutFailure = {
        type: "timeout",
        message: t("timeOutFailure"),
      };
      return { type: "failure", failure };
    }
    const failure: ServerFailure = {
      type: "server",
      message: t("somethingWrongTryAgain"),
    };
    return { type: "failure", failure };
  }
}

function _getHeaders(
  locale: string,
  isMultipart: boolean,
  token?: string | undefined | null,
  customHeaders?: Record<string, string>,
  hasBody = true,
): Headers {
  const headers = new Headers();
  headers.append("Accept-Language", locale);
  headers.append("Accept", "application/json; charset=UTF-8");

  if (hasBody && !isMultipart) {
    headers.append("Content-Type", "application/json");
  }

  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  if (customHeaders) {
    Object.entries(customHeaders).forEach(([key, value]) => {
      headers.append(key, value);
    });
  }

  return headers;
}
