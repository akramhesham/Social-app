import axios from "axios";

export async function LoginUser(dataUser){
    const {data}=await axios.post(`https://linked-posts.routemisr.com/users/signin`,dataUser)
    return data;
}