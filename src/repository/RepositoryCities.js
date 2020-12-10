import axios from "axios";
import { API_URL_BASE } from "../config";

export const getData = async () => {
    const res = await axios.get(API_URL_BASE);
    return res;
};

export const getAllCities = async () => {
    const res = await axios.post(API_URL_BASE + "/all");
    return res.data;
};
