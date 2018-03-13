import axios from 'axios';

export const BASE = 'https://itunes.apple.com';

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

export default {
  get(endpoint, options = {}) {
    return axios({
      url: `${BASE}/${endpoint}`,
      headers,
      ...options
    })
    .then(({ data }) => data);
  },
};
