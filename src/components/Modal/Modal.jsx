import styles from "../Modal/Modal.module.css"


export const Modal = ({modalClose, largeImageURL}) => {
    console.log("Large Image", largeImageURL)
    return (
<div className={styles.Overlay} onClick={modalClose}>
  <div className={styles.Modal}>
    <img src={largeImageURL} alt="" />
  </div>
</div>        
    )
}
