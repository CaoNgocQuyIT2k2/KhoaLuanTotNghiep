import axios from "axios";


//tạo ra 1 axios mới gắn sẵn headers và base url ~ axios instance 
export let https = axios.create({
    baseURL:"http://localhost:8080",
});