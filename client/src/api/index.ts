const BASE_URL = 'http://localhost:8080/api/';
const version = 'v1';

/**
 * @description List of all the routes used in the project
 */
const api = {
  login: `${BASE_URL}${version}/auth/login`,
  register: `${BASE_URL}${version}/auth/register`,
  getHistory: `${BASE_URL}${version}/booking`
};

export default api;