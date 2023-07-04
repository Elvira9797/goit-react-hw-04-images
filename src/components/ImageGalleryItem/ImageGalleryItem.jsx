import PropTypes from 'prop-types';
import {
  StyledImageGalleryItem,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

const ImageGalleryItem = ({
  image: { webformatURL, largeImageURL, tags },
  openModal,
}) => {
  return (
    <StyledImageGalleryItem onClick={() => openModal({ largeImageURL, tags })}>
      <ImageGalleryItemImage src={webformatURL} alt={tags} />
    </StyledImageGalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
