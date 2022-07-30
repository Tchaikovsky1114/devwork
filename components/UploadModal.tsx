import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { modalToggle } from '../store/slice/UploadSlice';
import Modal from 'react-modal';
import { CameraIcon, TrashIcon } from '@heroicons/react/outline';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { useSession } from 'next-auth/react';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable, uploadString } from 'firebase/storage';
import { format } from 'node:path/win32';
import { FolderDownloadIcon } from '@heroicons/react/solid';
import { async } from '@firebase/util';



const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
Modal.setAppElement('#__next');

const UploadModal = () => {
  const { isOpen } = useAppSelector((state) => state.upload);
  const dispatch = useAppDispatch();
  const filePickerRef = useRef<HTMLInputElement>(null);
  const captionRef = useRef<HTMLInputElement>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const {data: session} = useSession();
  const filePickerHandler = () => {
    filePickerRef.current!.click();
  };

  const addImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const fileArr = e.currentTarget.files;

      let fileURLs: string[] = [];
      let file: File;
      let filesLength = fileArr.length > 10 ? 10 : fileArr.length;

      for (let i = 0; i < filesLength; i++) {
        let fileReader = new FileReader();
        file = fileArr[i];
        fileReader.onload = () => {
          fileURLs[i] = fileReader.result as string;
          setSelectedImages((prev) => [...fileURLs]);
        };
        fileReader.readAsDataURL(file);
      }
    }
  };

  const deletePreviewImageHandler = (i: number) => {
    setSelectedImages((prev) => prev.filter((_, index) => i !== index));
  };

  const postHandler = async () => {
    setLoading(true);
    try{
      const docRef = await addDoc(collection(db, 'posts'), {
        username: session!.user.username,
        caption: captionRef.current!.value,
        profileImg: session?.user.image,
        timestemp: serverTimestamp()
      });
      const imagesArray:string[] = [];
      await selectedImages.map((image,index) => {
        const imageRef = ref(storage, `posts/${docRef.id}/image${index}`)
        
        uploadString(imageRef, image,"data_url").then( async(snapshot:any) => {
            const downloadURL =  await getDownloadURL(snapshot.ref)
            console.log(downloadURL)
            imagesArray.push(downloadURL)
            await updateDoc(doc(db,"posts",docRef.id),{
              image: imagesArray
            })
        })   
      })
    }catch(err){
      const typedError = err as Error
      console.log(typedError.message);
    }finally{
      setLoading(false);
    }
  };
  
  return (
    <>
      {isOpen && (
        <Modal
          className="max-w-lg w-[90%] p-6 absolute top-[15%] left-[50%] -translate-x-1/2 bg-white border-2 border-gray-200 rounded-md shadow-md focus:outline-gray-200"
          isOpen={isOpen}
          onRequestClose={() => {
            setSelectedImages([]);
            dispatch(modalToggle({ isOpen: !isOpen }));
          }}
        >
          {selectedImages && (
            <CarouselProvider
              className="mt-12"
              naturalSlideWidth={300}
              naturalSlideHeight={190}
              totalSlides={selectedImages.length}
            >
              <Slider className="w-full">
                {selectedImages.map((item, index) => (
                  <Slide
                    className="flex h-full justify-center items-center relative"
                    key={index + ''}
                    index={index}
                  >
                    <img
                      className="mx-auto w-[99%] max-h-[300px] h-[100%] object-contain"
                      src={item}
                      alt={index + ''}
                    />
                    <button
                      className="absolute top-1 right-1 rounded-full shadow-md"
                      onClick={() => deletePreviewImageHandler(index)}
                    >
                      <TrashIcon className="w-6 bg-rose-200 rounded-full p-1 " />
                    </button>
                  </Slide>
                ))}
              </Slider>
            </CarouselProvider>
          )}
          <div className="flex flex-col justify-center items-center h-full">
            {selectedImages.length === 0 && (
              <CameraIcon
                onClick={filePickerHandler}
                className="cursor-pointer h-12 bg-rose-200 p-2 rounded-full ring ring-gray-200 text-rose-600"
              />
            )}
            <input
              type="file"
              hidden
              multiple
              ref={filePickerRef}
              onChange={addImageHandler}
            />
            <div className="mt-12 w-full px-2">
              <input
                type="text"
                className="w-full border-none text-center focus:ring-blue-200 rounded-md"
                maxLength={150}
                placeholder="사진과 함께 전송할 메세지를 입력해주세요."
                ref={captionRef}
              />
            </div>
          </div>

          <button
            disabled={selectedImages.length === 0 || loading}
            className="mt-12 w-full bg-indigo-500 text-white p-2 shadow-md hover:brightness-125 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100"
            onClick={postHandler}
          >
            Upload
          </button>
        </Modal>
      )}
    </>
  );
};

export default UploadModal;
