import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 30_000,
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (
    config: InternalAxiosRequestConfig,
  ) => {
    /*
     * Temporary development context.
     *
     * This lets us build the Company platform before
     * implementing final authentication.
     *
     * The backend must not trust these headers in
     * production. Real authentication will replace them.
     */

    const isDevelopment =
      process.env.NEXT_PUBLIC_APP_ENV ===
      "development";

    const isDeveloperModeEnabled =
      process.env
        .NEXT_PUBLIC_DEV_MODE_ENABLED === "true";

    if (
      isDevelopment &&
      isDeveloperModeEnabled
    ) {
      config.headers.set(
        "X-Dev-User-Id",
        "dev-company-admin-001",
      );

      config.headers.set(
        "X-Dev-Company-Id",
        "demo-company-001",
      );

      config.headers.set(
        "X-Dev-Role",
        "company_admin",
      );
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (!error.response) {
      console.error(
        "FuelIQ API connection failed. Check whether the backend is running.",
      );
    } else if (
      error.response.status === 401
    ) {
      console.error(
        "FuelIQ API request was not authenticated.",
      );
    } else if (
      error.response.status === 403
    ) {
      console.error(
        "The current account does not have permission for this action.",
      );
    } else if (
      error.response.status === 404
    ) {
      console.error(
        "The requested FuelIQ resource was not found.",
      );
    } else if (
      error.response.status >= 500
    ) {
      console.error(
        "The FuelIQ backend encountered an error.",
      );
    }

    return Promise.reject(error);
  },
);

export default api;