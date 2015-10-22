import axios from 'axios'

export default {
    getMessages: function () {
        return axios.get('https://baconipsum.com/api/?type=all-meat&paras=10').then((response) => {
            return response.data;
        });
    }
}
