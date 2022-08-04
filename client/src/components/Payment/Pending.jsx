import { Link } from 'react-router-dom';
import styles from './Pending.module.css';
import { BiArrowBack } from "react-icons/bi";
import warning from './Img/warning.png'




export default function Pending() {

    return (
        <div>
            <div className={styles.imgDiv}>
                <img src={warning} alt=""/>
            </div>
            <p className={styles.msg}>Te avisaremos cuando recibamos tu pago, muchas gracias!</p>
            <div className={styles.divBtn}>
            <Link to='/inicio' className={styles.btn}><BiArrowBack />Volver</Link>
            <Link to='/carrito' className={styles.btnOtro}><BiArrowBack />Otro medio de pago</Link>
            </div>
        </div>
    )
}
