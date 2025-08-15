import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'react-router-dom'
import Loading from './Loading';
import PostsId from './PostsId';
import { getSinglePost } from '../API/Posts/PostDetails.api';


export default function PostDetails() {
    const {id}=useParams();
    const {isError,isLoading,error,data}=useQuery({queryKey:['post',id],queryFn:()=>getSinglePost(id)});
    if(isError){
        return <h2>{error.message}</h2>
    }
    if(isLoading){
        return <Loading></Loading>
    }
  return (
    <PostsId post={data.post}></PostsId>
  )
}
