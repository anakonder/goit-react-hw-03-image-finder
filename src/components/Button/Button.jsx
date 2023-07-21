import styles from "../Button/Button.module.css"
import PropTypes from 'prop-types'

export const Button = ({handleLoadMore}) => {
    return (
        <button className={styles.Button} type="button" onClick={handleLoadMore}>Load Mor</button>
    )
}

Button.propTypes = {
   handleLoadMore: PropTypes.func.isRequired
}