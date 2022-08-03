import { Link } from 'react-router-dom';
import styles from './Pending.module.css';
import { BiArrowBack } from "react-icons/bi";




export default function Pending() {

    return (
        <div>
            <p className={styles.msg}>Te avisaremos cuando recibamos tu pago, muchas gracias!</p>
            <div className={styles.divBtn}>
            <Link to='/inicio' className={styles.btn}><BiArrowBack />Volver</Link>
            <Link to='/carrito' className={styles.btn}><BiArrowBack />Otro medio de pago</Link>
            </div>
        </div>
    )
}
