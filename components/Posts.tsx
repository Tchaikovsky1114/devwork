import React from 'react';
import Post from './Post';

const Posts = () => {
  const dummyPosts = [
    {
      id: 1,
      username: 'john',
      userImage:
        'data:image/png;base64,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',
      img: 'https://images.unsplash.com/photo-1657299170950-9da95993c9ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
      caption: "so amaing",
    },
    {
      id: 2,
      username: 'hathaway',
      userImage:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr4aQfT8ndJSw8mWNk_z5y8Gd4qMbIppFlHw&usqp=CAU',
      img: 'https://images.unsplash.com/photo-1658956679025-8e888d3f4041?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      caption: "i can't wait!!",
    },
    {
      id: 3,
      username: 'watson',
      userImage:
        'https://i.pinimg.com/originals/64/95/d0/6495d05033eb2029300f4a6fe5151952.jpg',
      img: 'https://images.unsplash.com/photo-1658786335116-0f80cff8a17f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      caption: "i miss that my babyhood..",
    },
  ];
  return (
    <div>
      {dummyPosts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.username}
          userImage={post.userImage}
          image={post.img}
          caption={post.caption}
        />
      ))}
    </div>
  );
};

export default Posts;
