import styles from "../Button/Button.module.css"

export const Button = ({handleLoadMore}) => {
    return (
        <button className={styles.Button} type="button" onClick={handleLoadMore}>Load Mor</button>
    )
}