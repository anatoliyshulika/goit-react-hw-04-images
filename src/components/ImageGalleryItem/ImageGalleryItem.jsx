import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  tags,
}) {
  const [isModalShown, setIsModalShown] = useState(false);

  return (
    <>
      <GalleryItem>
        <GalleryItemImage
          onClick={() => setIsModalShown(true)}
          src={webformatURL}
          alt={tags}
        />
      </GalleryItem>
      {isModalShown && (
        <Modal
          url={largeImageURL}
          tag={tags}
          onClose={() => setIsModalShown(false)}
        />
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
