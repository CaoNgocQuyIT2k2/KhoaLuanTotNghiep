import axios from "axios";


//tạo ra 1 axios mới gắn sẵn headers và base url ~ axios instance 
export let https = axios.create({
    baseURL:"http://ec2-3-106-226-159.ap-southeast-2.compute.amazonaws.com:8080",
});