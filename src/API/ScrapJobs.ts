import axios from "axios";

const baseUrl =
  import.meta.env.VITE_OWN_SERVER_BASE_URL || "http://localhost:3000/api";

export const scrapInternshalaJobs = (filter?: string) => {
  return axios.get(`${baseUrl}/scrap/internshala?filter=${filter}`);
};

export const scrapNaukriJobs = (filter?: string) => {
  return axios.get(`${baseUrl}/scrap/naukri?filter=${filter}`);
};

export const scrapShineJobs = (filter?: string) => {
  return axios.get(`${baseUrl}/scrap/shine?filter=${filter}`);
};
