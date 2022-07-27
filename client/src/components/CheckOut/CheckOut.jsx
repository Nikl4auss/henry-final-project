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
    // const [active, setActive] = useState()

    async function redirectPay(e) {
        console.log(order)
        const data = await payCart(order, 15)
        console.log(data)
        window.location.href = data


    }

    return (
        <>
            {
                <div className={styles.container}>
                    <div className={styles.Encabezado}>
                        <h3>Elige como quieres obtener tu producto</h3>
                    </div>
                    <div className={styles.subContainer}>
                        {/* <button
                        onClick={() => setActive(!active)}
                        className={styles.close}><IoMdClose /></button> */}

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
                    {estadoEnvio || estadoSucursal ?
                    <div className={styles.btnPago}>
                        <button onClick={redirectPay}>Pagar</button>
                    </div> : <div></div>
                    }
                </div>
            }
        </>
    )
}