import axios from 'axios';

import { DJANGO_SHOP_API_URL } from './constants';

export default axios.create({
  baseURL: DJANGO_SHOP_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});
