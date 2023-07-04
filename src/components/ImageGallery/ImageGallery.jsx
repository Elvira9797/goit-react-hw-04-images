import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getImages } from '../../services/api';
import { StyledImageGallery, Wrapper } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem';
import { toast } from 'react-toastify';
import Loader from '../Loader'; // corrected import path
import Button from '../Button';

class ImageGallery extends Component {
  state = {
    images: [],
    error: null,
    isLoading: false,
    page: 1,
    showButton: false,
  };

  componentDidUpdate(prevProps) {
    const { page } = this.state;
    const { namePicture } = this.props;

    if (prevProps.namePicture !== namePicture) {
      this.setState({ page: 1 });
      this.fetchData(namePicture, page);
    }
  }

  fetchData = async (name, pageNum) => {
    try {
      this.setState({ isLoading: true, showButton: false });
      const data = await getImages(name, pageNum);
      this.handleImageData(data);
    } catch (error) {
      this.handleError();
    }
  };

  loadMoreImages = async () => {
    const { namePicture } = this.props;
    const { page } = this.state;
    this.setState({ isLoading: true });

    try {
      const data = await getImages(namePicture, page + 1);
      this.handleMoreImageData(data);
    } catch (error) {
      this.handleError();
    }
  };

  handleImageData = data => {
    if (data.hits.length === 0) {
      this.setState({ isLoading: false, showButton: false, images: [] });
      toast.error(
        'Sorry, there are no images matching your search query. Please try again'
      );
    } else {
      toast.success(`Hooray! We found ${data.totalHits} images`);
      this.setState({
        images: data.hits,
        showButton: true,
        isLoading: false,
      });
    }
  };

  handleMoreImageData = data => {
    const { page } = this.state;
    const totalPages = Math.floor(data.totalHits / 12);

    if (page >= totalPages) {
      this.setState({ isLoading: false, showButton: false });
      toast.info("You've reached the end of search results.");
    } else {
      this.setState(
        prevState => ({
          images: [...prevState.images, ...data.hits],
          page: page + 1,
          showButton: true,
          isLoading: false,
        }),
        () => {
          const { scrollHeight, clientHeight } = document.documentElement;
          const scrollPosition = scrollHeight - clientHeight;

          window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth',
          });
        }
      );
    }
  };

  handleError = () => {
    this.setState({
      error: 'Oops, some error occurred. Please, try again later.',
      isLoading: false,
    });
  };

  render() {
    const { images, error, isLoading, showButton } = this.state;
    const { openModal } = this.props;

    return (
      <div>
        {isLoading && <Loader />}
        {error && <p>{error}</p>}
        {images && (
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
              <Button loadMore={this.loadMoreImages} isLoading={isLoading}>
                Load More
              </Button>
            )}
          </Wrapper>
        )}
      </div>
    );
  }
}

ImageGallery.propTypes = {
  openModal: PropTypes.func.isRequired,
  namePicture: PropTypes.string.isRequired,
};

export default ImageGallery;
