import styles from "../Modal/Modal.module.css"
import PropTypes from 'prop-types'


export const Modal = ({modalClose, largeImageURL}) => {
    return (
        <div className={styles.Overlay} onClick={modalClose}>
        <div className={styles.Modal}>
            <img src={largeImageURL} alt="" />
        </div>
        </div>        
    )
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  modalClose: PropTypes.func.isRequired
}