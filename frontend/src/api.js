import axios from "axios";
import { apiUrl } from "./config";
import { getUserInfo } from "./localStorage";

export const getService = async (id) => {
    try {
        const response = await axios({
            url: `${apiUrl}/api/services/${id}`,
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
            },
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch(err) {
        console.log(err);
        return {error: err.response.data.message || err.message};
    }
};

export const signin = async ({email, password}) => {
    try {
        const responce = await axios({
            url: `${apiUrl}/api/users/signin`,
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
            },
            data: {
                email,
                password,
            },
        });
        if (responce.statusText !== 'OK') {
            throw new Error(responce.data.message);
        }
        return responce.data;
    } catch (err) {
        console.log(err);
        return {error: err.response.data.message || err.message};
    }
};

export const register = async ({name, email, password}) => {
    try {
        const responce = await axios({
            url: `${apiUrl}/api/users/register`,
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
            },
            data: {
                name,
                email,
                password,
            },
        });
        if (responce.statusText !== 'OK') {
            throw new Error(responce.data.message);
        }
        return responce.data;
    } catch (err) {
        console.log(err);
        return {error: err.response.data.message || err.message};
    }
};

export const update = async ({name, email, password}) => {
    try {
        const {_id, token} = getUserInfo();
        const responce = await axios({
            url: `${apiUrl}/api/users/${_id}`,
            method: 'PUT',
            header: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: {
                name,
                email,
                password,
            },
        });
        if (responce.statusText !== 'OK') {
            throw new Error(responce.data.message);
        }
        return responce.data;
    } catch (err) {
        console.log(err);
        return {error: err.response.data.message || err.message};
    }
};