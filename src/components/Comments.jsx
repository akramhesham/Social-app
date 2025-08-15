import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getComments } from '../API/Comments/Comments.api'
import Loading from './Loading';
import CommentDetails from './CommentDetails';

export default function Comments({id}) {
    const {data,isError,isLoading,error}=useQuery({queryKey:['comments',id],queryFn:()=>getComments(id)});
    if(isLoading){
        return <Loading></Loading>
    }
    if(isError){
        return <h2>{error.message}</h2>
    }
  return (
    <div>{data.comments.map(comment=><CommentDetails comment={comment} key={Comments._id}></CommentDetails>)}</div>
  )
}
