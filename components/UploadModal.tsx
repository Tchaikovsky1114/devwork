import React from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { modalToggle } from '../store/slice/UploadSlice';
import Modal from 'react-modal';

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
  console.log(isOpen);

  return (
    <div>
      {isOpen && (
        <Modal
          className="max-w-lg w-[90%] h-[300px] absolute top-56 left-[50%] -translate-x-1/2 bg-white border-2 border-gray-200 rounded-md shadow-md outline-none"
          isOpen={isOpen}
          onRequestClose={() => dispatch(modalToggle({ isOpen: !isOpen }))}
        >
          <div className="flex flex-col justify-center items-center h-full">
            <h1>Modal</h1>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UploadModal;
