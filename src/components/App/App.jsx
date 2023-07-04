import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Modal from 'components/Modal';
import { ModalImg } from '../Modal/Modal.styled';

class App extends Component {
  state = {
    searchValue: '',
    modal: {
      isOpen: false,
      visibleData: null,
    },
  };

  addNamePicture = namePicture => {
    this.setState({ searchValue: namePicture });
  };

  onOpenModal = data => {
    this.setState({
      modal: {
        isOpen: true,
        visibleData: data,
      },
    });
  };

  onCloseModal = () => {
    this.setState({
      modal: {
        isOpen: false,
        visibleData: null,
      },
    });
  };

  render() {
    const {
      searchValue,
      modal: { isOpen, visibleData },
    } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.addNamePicture} />
        <ImageGallery namePicture={searchValue} openModal={this.onOpenModal} />
        {isOpen && (
          <Modal closeModal={this.onCloseModal}>
            <ModalImg src={visibleData.largeImageURL} alt={visibleData.tags} />
          </Modal>
        )}
        <ToastContainer autoClose={3000} theme="colored" />
      </div>
    );
  }
}

export default App;
