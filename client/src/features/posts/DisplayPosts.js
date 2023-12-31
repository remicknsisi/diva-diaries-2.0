import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from './postsSlice';
import Post from "./Post";

function DisplayPosts() {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.entities);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [])

  const sortedPosts = posts ? posts.sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
  
    return dateB - dateA;
  }) : null

  if(sortedPosts){return (
    <div className="posts-container">
      {sortedPosts.map((p) => <Post key={p.id} post={p} user={p.user} inUserDetails={false}/>)}
    </div>
  );} else{
    return(<p>Loading...</p>)
  }
}

export default DisplayPosts;