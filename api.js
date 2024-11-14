// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/contacts'; // Adjust as necessary

export const fetchContacts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addContact = async (contact) => {
    const response = await axios.post(API_URL, contact);
    return response.data;
};

export const updateContact = async (id, updatedContact) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedContact);
    return response.data;
};
