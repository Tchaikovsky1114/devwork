import React, { useEffect, useState } from 'react';
import minifaker, { username } from 'minifaker'
import 'minifaker/locales/en';
import Story from './Story';

interface storyUsersType {
  username:string;
  img: string;
  id: number
}

const Stories = () => {
  const [storyUsers,setStoryUsers] = useState<storyUsersType[]>([]);

  useEffect(() => {
    const storyUsers = minifaker.array(20,(index) => {
    return {
      username: minifaker.username({locale:"en"}).toLowerCase(),
      img: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
      id: index
    }})
    setStoryUsers(storyUsers)
    console.log(storyUsers)
  }, [])
  return (
    <div className='flex flex-row justify-start items-center space-x-2 py-2 px-6 mt-8 bg-white border-gray-200 border overflow-x-scroll rounded-sm scrollbar'>
      {storyUsers.map(user => (<Story key={user.id} username={user.username} img={user.img} /> ))}
    </div>
  );
};

export default Stories;