import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_HOST

const ApiService = {
    get(resource, slug = "") {
        return new Promise((resolve, reject) => {
            axios.get(`${resource}/${slug}`)
                .then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                });
        })
    }
}

export default ApiService