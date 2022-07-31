import { collection, DocumentData, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import Post from './Post';

interface PostType {
  id: number
  username: string
  userImage: string
  image : string[]
  caption: string
}

const Posts = () => {
  const [posts, setPosts] = useState<DocumentData[]>([]);


  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'posts'),orderBy("timestemp", "desc")),((snapshot) => {
        setPosts(snapshot.docs)
      })
    )
    return () => { unsubscribe()}
  }, [])

  return (
    <div>
      {posts.map((post,index) => (
        <Post
          key={index}
          id={post.id}
          username={post.data().username}
          userImage={post.data().profileImg}
          image={post.data().image}
          caption={post.data().caption}
        />
      ))}
    </div>
  );
};

export default Posts;
