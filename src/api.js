import axios from 'axios'
import Firebase from 'firebase'


export default {
	myFirebaseRef: new Firebase("https://amber-fire-xxxx.firebaseio.com/bulletinboard"),

    getMessages: function () {
        return axios.get('https://baconipsum.com/api/?type=all-meat&paras=10').then((response) => {
            return response.data;
        });
    }
}

