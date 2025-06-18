import { API_URLS } from "../enums/URLS";
import { client } from "./client";

const createContact = async (payload) => {
    return await client.exec(`${API_URLS.CONTACT}`, {
        method: "POST",
        body: JSON.stringify(payload),
    });
};

const getAllContacts = async () => {
    return await client.exec(`${API_URLS.CONTACT}`, {
        method: "GET",
    });
};

const deleteContact = async (id) => {
    return await client.exec(`${API_URLS.CONTACT}/${id}`, {
        method: "DELETE",
    });
};

const getContactById = async (id) => {
    return await client.exec(`${API_URLS.CONTACT}/${id}`, {
        method: "GET",
    });
};

const updateContactById = async (id, contact) => {
    return await client.exec(`${API_URLS.CONTACT}/${id}`, {
        method: "PUT",
        body: JSON.stringify(contact),
    });
};

export const contactRepository = {
    createContact,
    getAllContacts,
    deleteContact,
    getContactById,
    updateContactById,
};
