import React from 'react';
import { useAppSelector } from '../store';
import MiniProfile from './MiniProfile';
import Posts from './Posts';
import Stories from './Stories';
import Suggestions from './Suggestions';

const Feed = () => {
const currentUser = useAppSelector(state => state.user)
  return (
    <main className={`grid ${currentUser.user!.username ? "grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto" : "grid-cols-1 md:grid-cols-2 md:max-w-3xl mx-auto" } `}>
      <section className="md:col-span-2">
        {/* stories */}
        <Stories />
        {/* posts */}
        <Posts />
      </section>
      <section className="hidden md:inline-grid md:col-span-1">
        <div className="fixed w-[380px]">
          {/* Mini Prifile */}
          <MiniProfile />
          {/* Suggections */}
          <Suggestions />
        </div>
      </section>
    </main>
  );
};

export default Feed;
