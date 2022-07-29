import React from 'react';

interface PostProps{
  id:number
  username:string
  userImage:string
  image:string
  caption:string
}

const Post = ({id,username,userImage,caption,image}:PostProps) => {
  return (
    <div>
      <h1>{username}</h1>
    </div>
  );
};

export default Post;