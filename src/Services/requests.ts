import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {URL} from '../constants/config';
import axios from 'axios';

export default class requests {
  isLoggedIn = async () => {
    try {
      const value = await AsyncStorage.getItem('cookie');
      return value;
    } catch (e) {
      // error reading value
      return e;
    }
  };

  getAdminToken = async () => {
    const data = {
      username: 'admin',
      password: 'admin123',
    };

    const headers = {
      'Content-Type': 'application/json',
    };
    return axios
      .post('https://siapmart.in/wp-json/jwt-auth/v1/token', data, {headers})
      .then((response) => response)
      .catch((error) => error);
  };

  register = async (email: string, username: string, password: string) => {
    const data = new FormData();
    data.append('username', username);
    data.append('password', password);
    data.append('email', email);

    const response = await this.getAdminToken();
    console.log('token_2', response);
    if (response.status !== 200) {
      return {message: 'Network Error! Please Retry'};
    }
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${response.data.token}`,
    };
    //
    return axios
      .post('https://siapmart.in/wp-json/wp/v2/users', data, {headers})
      .then((response) => response)
      .catch((error) => error);
  };

  loginUser = (email: string, password: string) => {
    const data = new FormData();
    data.append('username', email);
    data.append('password', password);
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    return axios
      .post(URL + '/auth/generate_auth_cookie', data, {headers})
      .then((response) => response)
      .catch((error) => error);
  };

  // getWalletBalance = async (id: string) => {
  //     const headers = {
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //         'Authorization': `Bearer ${response.data.token}`
  //     }
  //     return axios.get('https://siapmart.com/wp-json/wp/v2/current_balance/' + id, {headers}).then(response => response).catch(error => error)
  // }
  getUserData = async () => {
    const cookie = await AsyncStorage.getItem('cookie');
    const data = new FormData();
    data.append('cookie', cookie);
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    return axios
      .post(URL + '/auth/get_currentuserinfo', data, {headers})
      .then((response) => response)
      .catch((error) => error);
  };

  resetPassword = async (user: string) => {
    const data = new FormData();
    data.append('user_login', user);
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    return axios
      .post(URL + '/user/retrieve_password', data, {headers})
      .then((response) => response)
      .catch((error) => error);
  };
}
