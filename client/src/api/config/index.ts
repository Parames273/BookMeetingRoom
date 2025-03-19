import axios from 'axios';
let token = getToken();

function getToken() {
    const token = localStorage.getItem('access-token');
    
    if (!token) {
        console.log(`No token found!`);
    }
    return token
}

const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
        common: {
            "Content-Type": "application/json"
        }
    }
});

// Setting Authorization header
axiosInstance.interceptors.request.use(
    (config) => {
        if (!token) {
            token = getToken();
            console.log("TOKEN from interceptors:", token)
        }

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error: Error) => {
        return Promise.reject(error)
    }
)

// Response interceptor for handling errors
axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unAuthorised access or token expiration
            // Can redirect to login page or refresh token
        }

        return Promise.reject(error);
    }
)

export { axiosInstance };