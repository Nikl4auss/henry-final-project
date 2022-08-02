import styles from './Loading.module.css'


export default function Loading (){
    return (
        <div className={styles.container}>
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p className={styles.text}>Cargando...</p>
            </div>
        </div>
    )
}