import { Link } from 'react-router-dom';
import styles from './Success.module.css';


export default function Success() {

    return (
        <div>
            <p>Su pago se realizó con éxito, muchas gracias!</p>
            <Link to='/home' className={styles.btn}>◀ Volver</Link>
        </div>
    )
}

