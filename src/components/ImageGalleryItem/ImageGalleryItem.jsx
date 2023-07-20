import styles from "../ImageGalleryItem/ImageGalleryItem.module.css"
export const ImageGalleryItem = ({ card }) => {
  return (
    <li className={styles.ImageGalleryItem}>
      <img className={styles.ImageGalleryItemImage} src={card.webformatURL} alt="" />
    </li>
  );
};