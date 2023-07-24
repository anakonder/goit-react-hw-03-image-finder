import { Oval } from 'react-loader-spinner'
import styles from "./Loder.module.css"

export const Loader = () => {
    return (
        <div className={styles.loaderWrap}
            
          >
            <Oval
              wrapperClass="loader"
              ariaLabel="loading-indicator"
              height={100}
              width={100}
              strokeWidth={5}
              strokeWidthSecondary={5}
              color="#000fff"
              secondaryColor="#ffff00"
            />
          </div>
    )
}