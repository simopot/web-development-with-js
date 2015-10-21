import axios from 'axios'

export default {
    getMessages: function () {
        return axios.get('/api/tussi').then((response) => {
            return response.data;
        });
    }
}
