/**
 * App paths without locale prefix — use with next-intl `Link`, `redirect`, and `useRouter`.
 */
export const routes = {
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
} as const;
