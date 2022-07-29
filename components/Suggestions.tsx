import React, { useEffect, useState } from 'react';
import minifaker, { jobTitle } from 'minifaker';
import 'minifaker/locales/en'
import { storyUsersType } from './Stories';

interface SuggestionType {
  username: string
  jobTitle: string 
  img: string
  id: number
}

const Suggestions = () => {
  const [suggestions,setSuggestions] =useState<SuggestionType[]>([]);

  useEffect(() => {
    const suggestionUser = minifaker.array(20,(index) =>{
    return {
      username: minifaker.username({locale:"en"}).toLowerCase(),
      jobTitle:minifaker.jobTitle(),
      img: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
      id: index
    }})
    setSuggestions(suggestionUser);

  },[])
  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between mb-6 text-sm">
        <h3 className="font-bold text-gray-400">Suggestion for you</h3>
        <button className="text-gray-600 font-semibold">See All</button>
      </div>
      {suggestions.map((user) => (
      <div className="flex items-center justify-between mt-3" key={user.id}>
        <img className='h-10 rounded-full border p-[1px]' src={user.img} alt={user.username} />
        <div className="flex-1 ml-4">
          <h2 className="font-semibold text-sm">{user.username}</h2>
          <h3 className="text-gray-400 text-xs truncate w-[240px]">{user.jobTitle}</h3>
        </div>
        <button className='text-blue-400 font-semibold'>Follow</button>
      </div>))}
    </div>
  );
};

export default Suggestions;
