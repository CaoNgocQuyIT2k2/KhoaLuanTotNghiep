import axios from "axios";


//tạo ra 1 axios mới gắn sẵn headers và base url ~ axios instance 
export let https = axios.create({
    baseURL:"http://ec2-18-143-143-173.ap-southeast-1.compute.amazonaws.com:8080",
});