/**
 * App paths without locale prefix — use with next-intl `Link`, `redirect`, and `useRouter`.
 */
export const routes = {
  home: "/",
  account: "/account",
  auth: {
    login: "/login",
    register: "/register",
  },
  companies: {
    all: "/companies/all",
    add: "/companies/add",
    edit: (id: string) => `/companies/edit/${id}`,
  },
  modules: {
    all: "/modules/all",
    add: "/modules/add",
    edit: (id: string) => `/modules/edit/${id}`,
  },
  mobileAppSettings: {
    all: "/mobile-app-settings/all",
  },
  mobileAppThemes: {
    all: "/mobile-app-themes/all",
  },
  mobileAppTranslations: {
    all: "/mobile-app-translations/all",
  },
} as const;
