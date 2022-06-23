import styles from './button.module.css'

const index = ({width, height, onClick, title}) => {
    return (
        <div>
            <button className={styles.warpper} style={{width:width, height:height}} onClick={onClick}>{title}</button>
        </div>
      )
}

export default index