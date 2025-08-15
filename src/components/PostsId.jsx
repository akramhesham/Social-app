import React, { useContext, useState } from 'react'
import { convertDate } from '../lib/CreateData';
import { Link, useLocation } from 'react-router-dom';
import Comments from './Comments';
import CreateComment from './CreateComment';
import { auth } from '../Context/Auth.context';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from '../API/Posts/deletePost.api';
import toast from 'react-hot-toast';


export default function PostsId({ post }) {
  const queryClient = useQueryClient()
  const {mutate,isPending,data,isSuccess} = useMutation({
    mutationFn: deletePost,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['posts'] })
    if(allData?._id){
      queryClient.invalidateQueries({ queryKey: ['profile',allData._id] })
    }}
  });
  console.log(data);
  
  const { body, createdAt, _id, image, user: { name, photo, _id: userId } } = post;
  const { allData } = useContext(auth);
  const location = useLocation().pathname.startsWith('/posts');
  const [isOpen, setOpen] = useState(location);
  return (
    <div className="max-w-xl mx-auto my-3 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      {isPending && toast('Post is deleted')}
      <div className='flex items-center justify-between p-2'>
        <div className='flex items-center me-auto'>
          <img className="size-20 rounded-full" src={photo} alt />
          <div>
            <p className='text-gray-600'>{name}</p>
            <p className='text-gray-400'>{convertDate(createdAt)}</p>
          </div>
        </div>
        {userId == allData?._id && <button onClick={()=>mutate(_id)} className='bg-red-600 rounded-4xl p-3 cursor-pointer'>Delete</button>}
      </div>
      <Link to={`/posts/${_id}`}>
        <img className="w-full" src={image} alt />
      </Link>
      <div className="p-5">
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{body}</p>
        <div className='fa-xl text-gray-600 flex justify-between'>
          <i className='fa-solid fa-share cursor-pointer'></i>
          <i onClick={() => setOpen(!isOpen)} className='fa-solid fa-comment cursor-pointer'></i>
          <i className='fa-solid fa-thumbs-up cursor-pointer'></i>
        </div>
      </div>
      <>
        <CreateComment id={_id}></CreateComment>
        {isOpen && <Comments id={_id}></Comments>}
      </>
    </div>
  )
}
