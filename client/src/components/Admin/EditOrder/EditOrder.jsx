import { useState } from "react"
import styles from './editOrder.module.css'


export function EditOrder({ initalState, setEditarEntrega }) {

    function handleSelect(e) {
        e.preventDefault()
        setEditarEntrega(e.target.value)
    }

    return (
        <div>
            <select
                name='select'
                defaultValue={initalState}
                onChange={handleSelect}
                className={styles.selects}
            >
                <option
                    value='Pendiente'
                >Pendiente</option>
                <option
                    value='Despachado'
                >Despachado</option>
                <option
                    value='Entregado'
                >Entregado</option>
                <option
                    value='Cancelado'
                >Cancelado</option>
                <option
                    value='Devuelto'
                >Devuelto</option>
            </select>
        </div>
    )
}

export function EditPayment({ initalState, setEditPayment }) {

    function handleSelect(e) {
        e.preventDefault()
        setEditPayment(e.target.value)
    }

    return (
        <div>
            <select
                name='select'
                defaultValue={initalState}
                onChange={handleSelect}
                className={styles.selects}
            >
                <option value='approved'>Aprobado</option>
                <option value='pending'>Pendiete</option>
                <option value='failure'>Fallado</option>
            </select>
        </div>
    )
}