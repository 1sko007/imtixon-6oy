import axios from "axios";

const istance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${localStorage.getItem("token")}`
    }
});

const truncate = (str, max) => {
    if(str .length > max) {
       return  str.slice(0, max) + "..."
    }
    return str
}

export {istance, truncate}