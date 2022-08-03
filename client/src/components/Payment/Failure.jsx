import { Link } from 'react-router-dom';
import styles from './Failure.module.css';
import { useEffect, useState } from 'react';
import { getStatusOrder } from '../../services/shopingCart';
import { BiArrowBack } from "react-icons/bi";

export default function Failure() {
   
    const [dataStatusOrder, setDataStatusOrder] = useState("");
    const urlSearchParams = new URLSearchParams(window.location.search);
    let payment_id = urlSearchParams.get("payment_id");
    let external_reference = urlSearchParams.get("external_reference");
 
useEffect(() => {
    
    getStatusOrder(payment_id, external_reference).then((data) => {
      setDataStatusOrder(data.status);
      console.log(data.status);
    });
  }, [payment_id]);


    return (
        <div>
            <p className={styles.msg}>No se pudo concretar el pago, por favor intente nuevamente</p>
            <p>{dataStatusOrder}</p>
            <div className={styles.divBtn}>
            <Link to='/carrito' className={styles.btn}><BiArrowBack />Volver</Link>
            </div>
        </div>
    )
}

