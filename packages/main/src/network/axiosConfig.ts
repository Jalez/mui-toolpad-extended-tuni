/** @format */

import axios from 'axios';
import { baseUrl } from '../constants';

// Function to get the CSRF token from the cookies
function getCookie(name: string) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export const csrftoken = getCookie('csrftoken');

const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true, // for CSRF tokens, if needed
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFToken': csrftoken,
  },
});

// Update all API calls to use the prefixed routes in development

export default axiosInstance;
