import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Modal from 'components/Modal';
import { ModalImg } from '../Modal/Modal.styled';

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [modal, setModal] = useState({
    isOpen: false,
    visibleData: null,
  });

  const addNamePicture = namePicture => {
    setSearchValue(namePicture);
  };

  const onOpenModal = data => {
    setModal({
      isOpen: true,
      visibleData: data,
    });
  };

  const onCloseModal = () => {
    setModal({
      isOpen: false,
      visibleData: null,
    });
  };

  const { isOpen, visibleData } = modal;

  return (
    <div>
      <Searchbar onSubmit={addNamePicture} />
      <ImageGallery namePicture={searchValue} openModal={onOpenModal} />
      {isOpen && (
        <Modal closeModal={onCloseModal}>
          <ModalImg src={visibleData.largeImageURL} alt={visibleData.tags} />
        </Modal>
      )}
      <ToastContainer autoClose={3000} theme="colored" />
    </div>
  );
};

export default App;
