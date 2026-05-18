export const companyEndpoints = {
  baseUrl: "company",
  company(id: string) {
    return `${this.baseUrl}/${id}`;
  },
  details(id?: string, alias?: string) {
    let url = `${this.baseUrl}/details`;
    if (id) {
      url += `?id=${id}`;
    } else if (alias) {
      url += `?alias=${alias}`;
    }
    return url;
  },
};

export const dynamicsSettingsEndpoints = {
  baseUrl: "dynamics-settings",
  company(companyId: string) {
    return `${this.baseUrl}/company/${companyId}`;
  },
};

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
