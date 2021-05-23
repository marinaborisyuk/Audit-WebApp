import axios from "axios";
import { apiUrl } from "./config";
import { getUserInfo } from "./localStorage";

export const createAndDownloadPdf = async ({employees, purposes, estimates, results}) => {
    try {
        const responce = await axios({
            url: `${apiUrl}/api/method/createpdf`,
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
            },
            data: {
                employees,
                purposes,
                estimates,
                results
            },
        });
        if (responce.statusText !== 'Created') {
            throw new Error(responce.data.message);
        }
        return responce.data;
    } catch (err) {
        return {error: err.response.data.message || err.message};
    }
};

export const getPurposes = async () => {
    try {
        const response = await axios({
            url: `${apiUrl}/api/method`,
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
        return {error: err.response.data.message || err.message};
    }
};

export const getEmployees = async () => {
    try {
        const response = await axios({
            url: `${apiUrl}/api/employees`,
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
        return {error: err.response.data.message || err.message};
    }
};

export const getEmployee = async (id) => {
    try {
        const response = await axios({
            url: `${apiUrl}/api/employees/${id}`,
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
        return {error: err.response.data.message || err.message};
    }
};

export const createEmployee = async () => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/employees`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
        if (response.statusText !== 'Created') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (err) {
        return {error: err.responce.data.message || err.message};
    }
};

export const updateEmployee = async (employee) => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/employees/${employee._id}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            data: employee,
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (err) {
        return {error: err.responce.data.message || err.message};
    }
};

export const deleteEmployee = async (employeeId) => {
    try {
        const { token } = getUserInfo();
        console.log('loshara');
        const response = await axios({
            url: `${apiUrl}/api/employees/${employeeId}`,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (err) {
        return {error: err.responce.data.message || err.message};
    }
};

export const getServices = async () => {
    try {
        const response = await axios({
            url: `${apiUrl}/api/services`,
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
        return {error: err.response.data.message || err.message};
    }
};

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
        return {error: err.response.data.message || err.message};
    }
};

export const createService = async () => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/services`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
        if (response.statusText !== 'Created') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (err) {
        return {error: err.responce.data.message || err.message};
    }
};

export const updateService = async (service) => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/services/${service._id}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            data: service,
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (err) {
        return {error: err.responce.data.message || err.message};
    }
};

export const deleteService = async (serviceId) => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/services/${serviceId}`,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (err) {
        return {error: err.responce.data.message || err.message};
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
                'Authorization': `Bearer ${token}`,
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
        return {error: err.response.data.message || err.message};
    }
};

export const createOrder = async (order) => {
    try {
        const { token } = getUserInfo(); 
        const response = await axios({
            url: `${apiUrl}/api/orders`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            data: order, 
        });
        if (response.statusText !== 'Created') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (err) {
        return {error: err.responce ? err.responce.data.message : err.message};
    }   
};

export const getOrder = async (id) => {
    try {
        const { token } = getUserInfo();
    const response = await axios({
        url: `${apiUrl}/api/orders/${id}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    if (response.statusText !== 'OK') {
        throw new Error(response.data.message);
    }
    return response.data;
    } catch (err) {
        return {error: err.message};
    }
};

export const getMyOrders = async () => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/orders/mine`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }); 
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (err) {
        return { error: err.responce ? err.responce.data.message : err.message };
    }
};

export const getOrders = async () => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/orders`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type':'application/json',
            },
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch(err) {
        return {error: err.response.data.message || err.message};
    }
};

export const deleteOrder = async (orderId) => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/orders/${orderId}`,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (err) {
        return {error: err.responce.data.message || err.message};
    }
};

export const completeOrder = async (orderId) => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/orders/${orderId}/complete`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        } 
        return response.data;
    } catch (err) {
        return { error: err.message ? err.responce.data.message : err.message };
    }
};

export const getSummary = async () => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/orders/summary`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        } else {
            return response.data;
        }
    } catch (err) {
        return { error: err.message ? err.responce.data.message : err.message };
    }
};