// Axios
window.axios = require('axios');
auth_user = JSON.parse(window.localStorage.getItem('auth_user'));

if (auth_user) {
    window.axios.defaults.headers.common['Authorization'] = 'Token ' + auth_user.token;
}

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.baseURL = window.location.origin + '/';

