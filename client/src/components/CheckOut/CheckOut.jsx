import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './CheckOut.module.css';
import Map from "../Map/Map";
import Shipping from '../Payment/Shipping';
import { payCart } from '../../services/shopingCart';
// import { IoMdClose } from "react-icons/io";


export function CheckOut() {

    const [estadoEnvio, setEstadoEnvio] = useState();
    const [estadoSucursal, setEstadoSucursal] = useState();
    const order = useSelector(state => state.order)
    const idOrder = useSelector(state => state.idOrder)
    // const [active, setActive] = useState()

    async function redirectPay(e) {
      
        const data = await payCart(order, idOrder.orderId)
        window.location.href = data


    }

    return (
        <>
            {
                <div className={styles.container}>
                    <h1 className={styles.header}>Datos de envío</h1>
                    <div className={styles.Encabezado}>
                        <h3>Elegí como querés obtener tu producto</h3>
                    </div>
                    <div className={styles.subContainer}>
                        {/* <button
                        onClick={() => setActive(!active)}
                        className={styles.close}><IoMdClose /></button> */}
                        <div className={styles.btnContainer}>
                        <button
                            onClick={() => {
                                setEstadoEnvio(true)
                                setEstadoSucursal(false)
                            }}
                            className={styles.envio} > Envío a domicilio </button>
                        <button
                            onClick={() => {
                                setEstadoEnvio(false)
                                setEstadoSucursal(true)
                            }}
                            className={styles.sucursal} > Retiro por sucursal </button>
                            </div>

                        {estadoEnvio ?
                        <div className={styles.containerShipping}>
                            <Shipping />
                        </div> : <div></div>
                        }
                        {estadoSucursal ?
                        <div className={styles.containerMap}>
                            <Map />
                        </div> : <div></div>
                        }
                    </div>
                    <div className={styles.divBtnPago}>
                    {estadoEnvio || estadoSucursal ?
                    
                        <button className={styles.btnPago} onClick={redirectPay}>PAGAR</button>
                    : <div></div>
                    }
                    </div>
                </div>
            }
        </>
    )
}