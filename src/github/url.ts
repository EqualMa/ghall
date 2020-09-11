export const GH_BASE_URL = "https://github.com";

export const ghUserResUrl = (login: string) => `/${login}`;
export const ghUserUrl = (login: string) => GH_BASE_URL + ghUserResUrl(login);
