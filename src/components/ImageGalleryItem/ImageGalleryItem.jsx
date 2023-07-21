import styles from "../ImageGalleryItem/ImageGalleryItem.module.css"
import PropTypes from 'prop-types'

export const ImageGalleryItem = ({ card, onClick }) => {
  return (
    <li className={styles.ImageGalleryItem}>
      <img className={styles.ImageGalleryItemImage} src={card.webformatURL} alt="" onClick={onClick}/>
    </li>
  );
};

ImageGalleryItem.propTypes = {
  card: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}