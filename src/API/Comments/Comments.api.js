import axios from "axios";

const token=localStorage.getItem('token');
export async function getComments(postID){
    const {data}=await axios.get(`https://linked-posts.routemisr.com/posts/${postID}/comments`,{
        headers:{
            token
        }
    });
    return data;
}