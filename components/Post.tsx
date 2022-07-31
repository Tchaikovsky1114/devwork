import React from 'react';
import { DotsHorizontalIcon } from '@heroicons/react/solid';
import {
  HeartIcon,
  ChatIcon,
  BookmarkIcon,
  EmojiHappyIcon,
} from '@heroicons/react/outline';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {useSession} from 'next-auth/react'


interface PostProps {
  id: number;
  username: string;
  userImage: string;
  image: string[];
  caption: string;
}

const Post = ({ id, username, userImage, caption, image }: PostProps) => {
  const {data: session} = useSession();
  return (
    <div className="bg-white my-8 border rounded-md">
      {/* Header */}
      <div className="flex items-center p-5">
        <img
          className="w-12 h-12 rounded-full object-cover p-[1px] border mr-3"
          src={userImage}
          alt={username}
        />
        <p className="font-bold flex-1">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>

      <div>{image?.length  <= 1 ? "" :`총 ${image?.length}장 게시됨`}</div>
      {/* Post Image */}
      <CarouselProvider
        naturalSlideWidth={300}
        naturalSlideHeight={190}
        totalSlides={image.length}
      >
        <Slider className="w-full">
          {image.map((item, index) => (
            <Slide
              className="flex h-full justify-center items-center relative"
              key={index + ''}
              index={index}
            >
              <img
                className="object-cover w-full"
                src={item}
                alt="post-image"
              />
            </Slide>
          ))}
        </Slider>
      </CarouselProvider>

      {/* Post Buttons */}

      {session &&
      <div className="flex justify-between w-full px-4 pt-4 pb-1">
        <div className="flex space-x-4 items-center">
          <HeartIcon className="btn" />
          <ChatIcon className="btn" />
        </div>
        <BookmarkIcon className="btn" />
      </div>
      }
      {/* Post Comments */}
      <p className="p-4 truncate">
        <span className="font-bold mr-2">{username}</span>
        {caption}
      </p>
      {/* Post Input */}
      {session &&
      <form className="flex items-center p-4 space-x-2">
        <EmojiHappyIcon className="w-8 h-8" />
        <input
          className="border-none flex-1 focus:outline-blue-300 focus:ring-0"
          type="text"
          placeholder="Enter your comment..."
        />
        <button className="text-blue-400 font-bold">Post</button>
      </form>}
    </div>
  );
};

export default Post;
