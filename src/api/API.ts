import axios from "axios"

const instance = axios.create({
    headers: {
        "API-KEY": "c75887ba-6f74-4f8a-bb61-ad46acf96ee1"
    },
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true
})

export default instance