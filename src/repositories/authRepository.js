import { API_URLS } from "../enums/URLS";
import { client } from "./client";

const login = async (payload) => {
    return await client.exec(`${API_URLS.AUTH}/login`, {
        method: "POST",
        body: JSON.stringify(payload),
    });
};

const me = async () => {
    return await client.exec(`${API_URLS.AUTH}/me`, {
        method: "POST",
    });
};
export const authRepository = { login, me };
