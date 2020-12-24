import axios from 'axios';

 const instance =axios.create(
    {
        baseURL: 'https://assignment1-97242-default-rtdb.firebaseio.com/'
    }
);
export default instance; 