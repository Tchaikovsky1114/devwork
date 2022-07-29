import React from 'react';
import Posts from './Posts';
import Stories from './Stories';

const Feed = () => {
  return (
    <main>
      <section>
        {/* stories */}
      <Stories />
        {/* posts */}
        <Posts/>
      </section>
      <section>
        {/* Mini Prifile */}

        {/* Suggections */}
      </section>
    </main>
  );
};

export default Feed;
