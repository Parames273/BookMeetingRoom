import axios from 'axios';
import { Credentials } from '../typings';
import api from '.';

export const loginApi = (credentials: Credentials) => {
    return axios.post(api.login, credentials);
};