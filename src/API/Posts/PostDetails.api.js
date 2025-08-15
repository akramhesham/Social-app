import axios from "axios";

const token = localStorage.getItem('token');
export async function getSinglePost(postId) {
    const { data } = await axios.get(`https://linked-posts.routemisr.com/posts/${postId}`, {
        headers: {
            token
        }
    }
    );
    return data;
}