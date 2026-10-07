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

export const licenseEndpoints = {
  baseUrl: "license",
  company(companyId: string) {
    return `${this.baseUrl}/company/${companyId}`;
  },
  companyLicense(companyId: string, licenseId: string) {
    return `${this.baseUrl}/company/${companyId}/${licenseId}`;
  },
};

export const moduleEndpoint = "module";

export const mobileAppSettingsEndpoint = "mobile-app-settings";

export const mobileAppSettingsEndpoints = {
  baseUrl: mobileAppSettingsEndpoint,
  byId(id: string) {
    return `${this.baseUrl}/${id}`;
  },
  byPlatform(platform: string) {
    return `${this.baseUrl}/platform/${platform}`;
  },
};

export const mobileAppThemesEndpoint = "mobile-app-themes";

export const mobileAppThemesEndpoints = {
  baseUrl: mobileAppThemesEndpoint,
  byId(id: string) {
    return `${this.baseUrl}/${id}`;
  },
};

export const mobileAppTranslationsEndpoint = "mobile-app-translations";

export const mobileAppTranslationsEndpoints = {
  baseUrl: mobileAppTranslationsEndpoint,
  keys: `${mobileAppTranslationsEndpoint}/keys`,
  key(id: string) {
    return `${mobileAppTranslationsEndpoint}/keys/${id}`;
  },
  translations: `${mobileAppTranslationsEndpoint}/translations`,
  translation(id: string) {
    return `${mobileAppTranslationsEndpoint}/translations/${id}`;
  },
};

export const authEndpoints = {
  prefix: "auth",
  get login() {
    return `${this.prefix}/login`;
  },
  get register() {
    return `${this.prefix}/register`;
  },
};
