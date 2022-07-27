import React, { useState } from 'react';
import styles from './CheckOut.module.css';
import {Link}from 'react-router-dom'
import Map from "../Map/Map";
import Shipping from '../Payment/Shipping';
// import { IoMdClose } from "react-icons/io";


export default function CheckOut() {

const [estadoEnvio, setEstadoEnvio] = useState();
const [estadoSucursal, setEstadoSucursal] = useState();
// const [active, setActive] = useState()

return (
            <>
        {
            estadoEnvio &&
            <div className={styles.container}>
                <div className={styles.modalContainer}>
                    {/* <button
                        onClick={() => setActive(!active)}
                        className={styles.close}><IoMdClose /></button> */}
                <div className={styles.EncabezadoModal}>                    
                        <h3>Datos de envío</h3>
                </div> 
                <button
                        onClick={() => setEstadoEnvio(!estadoEnvio)}  
                        className={styles.envio} > Direccion de envio </button>
                <div className={styles.containerMap}>
                    <Shipping />
                </div> 


                <button
                        onClick={() => setEstadoSucursal(!estadoSucursal)}  
                        className={styles.sucursal} > Retiro por sucursal </button>
                <div className={styles.containerMap}>
                    <Map />
                </div>              
                </div>
                    <div className={styles.btnPago}>
                        <Link to='/Pago'>Continuar con el pago</Link>
                    </div>
                </div>
        }
            </>
)
}