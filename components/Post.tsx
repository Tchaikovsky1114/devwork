import React from 'react';
import {DotsHorizontalIcon} from '@heroicons/react/solid'
import {HeartIcon,ChatIcon,BookmarkIcon} from '@heroicons/react/outline'
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

      {/* Post Buttons */}
      <div className="flex justify-between w-full px-4 pt-4 pb-1">
      <div className="flex space-x-4 items-center">
      <HeartIcon className="btn" />
      <ChatIcon className="btn" />
      </div>
      <BookmarkIcon className="btn" />
      </div>
    </div>
  );
};

export default Post;