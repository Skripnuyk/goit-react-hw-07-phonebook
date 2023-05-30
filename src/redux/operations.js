import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL =
  'https://647481017de100807b1b13b7.mockapi.io/';

export const getContacts = async () => {
    const data = await axios.get('/contacts');
    return data;
};

export const addContact = async data => {
    const { data: result } = await axios.post('/contacts', data);
    return result;
};

export const deleteContact = async id => {
    const data = await axios.delete(`/contacts/${id}`);
    return data;
};

export const fetchAllContacts = createAsyncThunk(
    'contacts/fetchContacts', async (_, thunkAPI) => {
        try {
            const data = await getContacts();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchAddContact = createAsyncThunk(
    'contacts/fetchAddContact',
    async (data, thunkAPI) => {
        try {
            const result = await addContact(data);
            return result;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchDeleteContact = createAsyncThunk(
    'contacts/fetchDeleteContact',
    async (id, thunkAPI) => {
        try {
            const { data } = await deleteContact(id);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);