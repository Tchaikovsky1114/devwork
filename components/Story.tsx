import React from 'react';

interface StoryProps {
  username:string;
  img: string
  
}

const Story = ({username,img}:StoryProps) => {
  return (
    <div>
      <img src={img} alt={username} /> 
    <p>{username}</p>
    </div>
  );
};

export default Story;