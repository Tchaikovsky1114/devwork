import React from 'react';
import {DotsHorizontalIcon} from '@heroicons/react/solid'
interface PostProps{
  id:number
  username:string
  userImage:string
  image:string
  caption:string
}

const Post = ({id,username,userImage,caption,image}:PostProps) => {
  return (
    <div className='bg-white my-8 border rounded-md'>
      {/* Header */}
      <div className="flex items-center p-5">
        <img className="w-12 h-12 rounded-full object-cover p-[1px] border mr-3" src={userImage} alt={username} />
        <p className="font-bold flex-1">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>

      {/* Post Image */}
      <img className="object-cover w-full" src={image} alt="post-image" />
    </div>
  );
};

export default Post;