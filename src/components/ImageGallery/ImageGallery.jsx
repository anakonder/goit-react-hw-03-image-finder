import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import styles from "../ImageGallery/ImageGallery.module.css"

export const ImageGallery = ({ imagesArray }) => {
  return (
    <ul className={styles.ImageGallery}>
      {imagesArray.length > 0 ? (
        imagesArray.map((image) => (
            <ImageGalleryItem
                key={image.id}
                card={image} />
        ))
      ) : (
        <p>No images found</p>
      )}
    </ul>
  );
};