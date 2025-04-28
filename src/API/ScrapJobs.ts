import axios from "axios";

const baseUrl = "http://localhost:3000/api";

export const scrapInternshalaJobs = (filter?: string) => {
  return axios.get(`${baseUrl}/scrap/internshala?filter=${filter}`);
};

export const scrapNaukriJobs = (filter?: string) => {
  return axios.get(`${baseUrl}/scrap/naukri?filter=${filter}`);
};
