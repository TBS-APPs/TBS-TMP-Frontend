export const getCompaniesEndpoint = "company";
export const moduleEndpoint = "module";

export const authEndpoints = {
  prefix: "auth",
  get login() {
    return `${this.prefix}/login`;
  },
  get register() {
    return `${this.prefix}/register`;
  },
};
