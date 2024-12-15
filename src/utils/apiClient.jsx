// import axios from 'axios';

// const apiClient = axios.create({
//   baseURL: process.env.REACT_APP_API_BASE_URL, 
// });

// apiClient.interceptors.request.use(
//   (config) => {
//     const token =(localStorage.getItem("token")); 
//     if (token) {
//       // config.headers.Authorization = `Bearer ${token}`;
//       config.headers.token = `${token}`;
//     }
//     // config.headers["ngrok-skip-browser-warning"] = "69420"; 
//     // config.headers["Access-Control-Allow-Origin"] = "*"; 
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && (error.response.status === 401 || error.response.status === 400)) {
//       localStorage.removeItem("user");
//       localStorage.removeItem("token");
//       window.location.href = "/";
//     }
//     return Promise.reject(error);
//   }
// );

// export default apiClient;

import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000', 
});

// Add request interceptor for adding token and custom headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Use a standard Authorization header if required
      // config.headers.Authorization = `Bearer ${token}`;
      config.headers.token=`${token}`
    }
    // config.headers['ngrok-skip-browser-warning'] = '69420';
    // config.headers['Access-Control-Allow-Origin'] = '*'; 
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for handling specific status codes
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 400)) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default apiClient;

