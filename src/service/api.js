import axios from 'axios';

const api= axios.create({
    baseURL: 'https://test-crudbacksequileze.herokuapp.com/'
});
// const api= axios.create({
//     baseURL: 'http://localhost:3333'
// });

export default api;