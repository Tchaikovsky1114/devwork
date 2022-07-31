/* eslint-disable @next/next/no-img-element */

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { DotsHorizontalIcon } from '@heroicons/react/solid';
import {
  HeartIcon,
  ChatIcon,
  BookmarkIcon,
  EmojiHappyIcon,
} from '@heroicons/react/outline';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { useSession } from 'next-auth/react';
import {  addDoc,collection,DocumentData,onSnapshot,orderBy,query,serverTimestamp} from 'firebase/firestore';
import { db } from '../firebase';
import Moment from 'react-moment';


interface PostProps {
  id: string;
  username: string;
  userImage: string;
  image: string[];
  caption: string;
}

const Post = ({ id, username, userImage, caption, image }: PostProps) => {
  console.log(id);
  const { data: session } = useSession();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<DocumentData[]>([]);
  const commentHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.currentTarget.value);
  };

  const submitCommentHandler = async (e: FormEvent<HTMLFormElement>) => {
    if (!session) return;
    e.preventDefault();
    setComment('');
    const commentToSend = comment;
    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
      like: 0,
    });
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, 'posts', id, 'comments'),
        orderBy('timestamp', 'desc')
      ),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );
  }, [id]);

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

      <div>{image?.length <= 1 ? '' : `총 ${image?.length}장 게시됨`}</div>

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
              key={index}
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

      {session && (
        <div className="flex justify-between w-full px-4 pt-4 pb-1">
          <div className="flex space-x-4 items-center">
            <HeartIcon className="btn" />
            <ChatIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}

      {/* Post Comments */}
      <p className="p-4 truncate">
        <span className="font-bold mr-2">{username}</span>
        {caption}
      </p>

      {comments.length > 0 && (
        <>
         <p className="font-bold text-xs py-2 border-b-2">{comments.length > 0 ?`${comments.length}개의 댓글` : "" }</p>
        <div className=" mx-10 max-h-32 overflow-y-scroll scrollbar-none pt-2">
         
          {comments.map(comment => (
          <div key={comment.id} className="flex items-center space-x-2 mb-3 ">
            <img className="h-7 rounded-full object-cover" src={comment.data().userImage} alt={comment.data().username} />
            <p className="font-semibold pr-2">{comment.data().username}</p>
            <p className="flex-1 truncate">{comment.data().comment}</p>
            <p className='text-[4px]'>{comment.data().like}</p>
            <Moment fromNow className='text-xs'>{comment.data().timestamp?.toDate()}</Moment>
            
          </div>
          )
          )}
        </div>
        </>
      )}


      {/* Post Input */}
      {session && (
        <form
          onSubmit={submitCommentHandler}
          className="flex items-center p-4 space-x-2"
        >
          <EmojiHappyIcon className="w-8 h-8" />
          <input
            value={comment || ''}
            className="border-none flex-1 focus:outline-blue-300 focus:ring-0"
            type="text"
            placeholder="Enter your comment..."
            onChange={commentHandler}
          />
          <button
            disabled={!comment.trim()}
            type="submit"
            className="text-blue-400 font-bold disabled:cursor-not-allowed disabled:text-gray-400"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
