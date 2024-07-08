import axios from "axios"

const instance = axios.create({
    headers: {
        "API-KEY": "781d2644-ca31-489f-a315-4ce4070b9907"
    },
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true
})

export default instance
