import axios from "axios";

const token = localStorage.getItem('token');
export async function uploadPhoto(photo) {
    const { data } = await axios.put('https://linked-posts.routemisr.com/users/upload-photo', photo, {
        headers: {
            token,
            'Content-Type': 'multipart/form-data'
        }
    })
    return data;
}