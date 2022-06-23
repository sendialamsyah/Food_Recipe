import styles from './input.module.css'

const index = ({type, name, id, value, placeholder, onChange}) => {
    return (
        <div>
            <input className={styles.warpper} type={type} name={name} id={id} value={value} placeholder={placeholder} onChange={onChange}/>
        </div>
      )
}

export default index