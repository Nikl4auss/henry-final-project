import { Link } from 'react-router-dom';
import styles from './Failure.module.css';



export default function Failure() {


    return (
        <div>
            <p>No se pudo concretar el pago, por favor intente nuevamente</p>
            <Link to='/carrito' className={styles.btn}>◀ Volver</Link>
        </div>
    )
}

