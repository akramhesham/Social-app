import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'react-router-dom'
import { getProfile } from '../../API/Profile.api';
import PostsId from '../PostsId';
import { Helmet } from 'react-helmet';

export default function Profile() {
    const {id}=useParams();
    const{data}=useQuery({queryKey:['profile',id],queryFn:()=>getProfile(id)});
    console.log(data?.posts);
  return (
    
    <div>
          <Helmet>
        <title>Profile</title>
        <meta name="description" content="Helmet application" />
    </Helmet>
      {data?.posts.map(post=><PostsId key={post._id} post={post}></PostsId>)}</div>
  )
}
