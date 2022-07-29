import React from 'react';

interface StoryProps {
  username:string;
  img: string
  
}

const Story = ({username,img}:StoryProps) => {
  return (
    <div >
      <img className='h-14 rounded-full p-[1px] border-2 box-border border-red-500 cursor-pointer hover:scale-105 transition-transform duration-200 ease-out' src={img} alt={username} /> 
    <p className='text-xs w-14 truncate'>{username}</p>
    </div>
  );
};

export default Story;