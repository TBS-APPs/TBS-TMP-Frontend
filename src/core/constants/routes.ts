/**
 * App paths without locale prefix — use with next-intl `Link`, `redirect`, and `useRouter`.
 */
export const routes = {
  companies: {
    all: "/companies/all",
    add: "/companies/add",
  },
  modules: {
    all: "/modules/all",
    add: "/modules/add",
  },
} as const;
