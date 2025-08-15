import { useQuery } from '@tanstack/react-query';
import Loading from '../Loading';
import PostsId from '../PostsId';
import { useContext } from 'react';
import { auth } from '../../Context/Auth.context';
import AddPost from '../AddPost';
import { getPosts } from '../../API/Posts/Posts.api';
import { Helmet } from 'react-helmet';

export default function Home() {
  const { isLoading, isError, error, data } = useQuery({ queryKey: ['posts'], queryFn: getPosts });
  const { allData } = useContext(auth);
  if (isLoading) {
    return <Loading></Loading>
  }
  if (isError) {
    return <h2>{error.message}</h2>
  }
  console.log(data.posts);

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      {<h1 className='text-black'>Welcome {allData.name}</h1>}
      <AddPost></AddPost>
      {data.posts.map(post => <PostsId key={post._id} post={post}></PostsId>)}
    </>
  )
}
