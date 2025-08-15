import axios from "axios";

const token=localStorage.getItem('token');
export async function getProfile(userID){
    const {data}=await axios.get(`https://linked-posts.routemisr.com/users/${userID}/posts`,{
        headers:{
            token
        }
    })
    return data;
} 