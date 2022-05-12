import axios from 'axios';

axios.defaults.headers.authorization =  'bearer ' + sessionStorage.getItem('token');
axios.defaults.headers.get['Pragma'] = 'no-cache';
axios.defaults.headers.get['Cache-Control'] = 'no-cache, no-store';

export default axios;