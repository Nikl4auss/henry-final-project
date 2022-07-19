import { Link } from 'react-router-dom';
import styles from './Pending.module.css';




export default function Pending() {

    return (
        <div>
            <p>Te avisaremos cuando recibamos tu pago, muchas gracias!</p>
            <Link to='/home' className={styles.btn}>◀ Volver</Link>
            <Link to='/carrito' className={styles.btn}>◀ Otro medio de pago</Link>
        </div>
    )
}
