import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getImages } from '../../services/api';
import { StyledImageGallery, Wrapper } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem';
import { toast } from 'react-toastify';
import Loader from '../Loader';
import Button from '../Button';

const ImageGallery = ({ openModal, namePicture }) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (namePicture === '') return;
    fetchData(namePicture, 1);
  }, [namePicture]);

  const fetchData = async (name, pageNum) => {
    try {
      setIsLoading(true);
      setShowButton(false);
      setPage(1);
      const data = await getImages(name, pageNum);
      handleImageData(data);
    } catch (error) {
      handleError();
    }
  };

  const loadMoreImages = async () => {
    setIsLoading(true);
    try {
      const data = await getImages(namePicture, page + 1);
      handleMoreImageData(data);
    } catch (error) {
      handleError();
    }
  };

  const handleImageData = data => {
    if (data.hits.length === 0) {
      setIsLoading(false);
      setShowButton(false);
      setImages([]);
      toast.error(
        'Sorry, there are no images matching your search query. Please try again'
      );
    } else {
      toast.success(`Hooray! We found ${data.totalHits} images`);
      setImages(data.hits);
      setShowButton(true);
      setIsLoading(false);
    }
  };

  const handleMoreImageData = data => {
    const totalPages = Math.floor(data.totalHits / 12);
    if (page >= totalPages) {
      setIsLoading(false);
      setShowButton(false);
      toast.info("You've reached the end of search results.");
    } else {
      setImages(prevImages => [...prevImages, ...data.hits]);
      setPage(prevPage => prevPage + 1);
      setShowButton(true);
      setIsLoading(false);
    }
  };

  const handleError = () => {
    setError('Oops, some error occurred. Please, try again later.');
    setIsLoading(false);
  };

  useEffect(() => {
    if (page !== 1) {
      const { scrollHeight, clientHeight } = document.documentElement;
      const scrollPosition = scrollHeight - clientHeight;

      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [page]);

  return (
    <div>
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      {images.length > 0 && (
        <Wrapper>
          <StyledImageGallery>
            {images.map((image, index) => (
              <ImageGalleryItem
                key={index}
                image={image}
                openModal={openModal}
              />
            ))}
          </StyledImageGallery>
          {showButton && (
            <Button loadMore={loadMoreImages} isLoading={isLoading}>
              Load More
            </Button>
          )}
        </Wrapper>
      )}
    </div>
  );
};

ImageGallery.propTypes = {
  openModal: PropTypes.func.isRequired,
  namePicture: PropTypes.string.isRequired,
};

export default ImageGallery;
