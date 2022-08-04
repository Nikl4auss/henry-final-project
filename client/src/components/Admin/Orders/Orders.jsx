import React, { useEffect } from "react"
import { useState } from "react"
import { IoMdClose } from "react-icons/io"
import { MdOutlineDone } from "react-icons/md"
import { NavLink } from "react-router-dom"
import { getOrders, putOrder } from "../../../services/productsServices"
import { useSessionStorage } from "../../../services/useStorage"
import Loading from "../../Loading/Loading"
import { EditOrder, EditPayment } from "../EditOrder/EditOrder"
import MenuDesplegable from "./MenuDesplegable"
import styles from './Orders.module.css'


export default function Orders() {
    const [orders, setOrders] = useState([])
    const [filterOrders, setFilterOrders] = useSessionStorage('filterOrder', 'empty')
    const [filterPayment, setFilterPayment] = useSessionStorage('filterPayment', 'empty')
    const [editActive, setEditActive] = useState(false)
    const [editarEntrega, setEditarEntrega] = useState('')
    const [editPayment, setEditPayment] = useState('')

    useEffect(() => {
        getOrders(filterOrders, filterPayment).then(data => setOrders(data))

        return () => {
            setOrders([])
        }
    }, [])

    function handleSelect(e) {
        e.preventDefault()
        setFilterPayment('empty')
        getOrders(e.target.value, 'empty').then(data => setOrders(data))
        setFilterOrders(e.target.value)
    }

    function traslate(text) {
        if (text === 'pending') return 'Pendiente'
        if (text === 'approved') return 'Aprobado'
        if (text === 'failure') return 'Fallado'
    }

    function handleSelectPayment(e) {
        e.preventDefault()
        setFilterOrders('empty')
        getOrders('empty', e.target.value).then(data => setOrders(data))
        setFilterPayment(e.target.value)
    }

    function editOrder(id) {
        if (editarEntrega.length === 0 && editPayment.length === 0) return;
        putOrder(id, editarEntrega, editPayment).then(data => {
            console.log(data)
            setEditActive(!editActive)
            setEditPayment('')
            setEditarEntrega('')
            getOrders(filterOrders, filterPayment).then(data => setOrders(data))
        })
    }

    return (
        <div className={styles.allContainer}>
            <div className={styles.firstDivContainer}>
                <h1 className={styles.title}> Órdenes </h1>
                <div className={styles.divSelects}>
                    <select
                        name='select'
                        defaultValue={filterOrders}
                        onChange={handleSelect}
                        className={styles.selects}
                    >
                        <option
                            value='empty'
                            disabled
                            hidden
                            selected={filterOrders === 'empty' ? true : false}>
                            Estado de entrega
                        </option>
                        <option value='Todos'>Todos</option>
                        <option value='Pendiente'>Pendiente</option>
                        <option value='Despachado'>Despachado</option>
                        <option value='Entregado'>Entregado</option>
                        <option value='Cancelado'>Cancelado</option>
                        <option value='Devuelto'>Devuelto</option>
                    </select>
                    <select
                        name='select'
                        defaultValue={filterPayment}
                        onChange={handleSelectPayment}
                        className={styles.selects}
                    >
                        <option
                            value='empty'
                            disabled
                            hidden
                            selected={filterPayment === 'empty' ? true : false}>
                            Estado de pago
                        </option>
                        <option value='Todos'>Todos</option>
                        <option value='approved'>Aprobado</option>
                        <option value='pending'>Pendiete</option>
                        <option value='failure'>Fallado</option>
                    </select>
                </div>
            </div>
            {orders?.length > 0 ?
                <>

                    {orders.map(order => {
                        return (
                            <div className={styles.container}>
                                <div className={styles.interContainer}>
                                    <div className={styles.divPrice}>
                                        <h2>Orden N°: {order.id}</h2>
                                        <h4>Total: ${order.totalPrice}</h4>
                                    </div>
                                    <div className={styles.divStatus}>
                                        <div className={styles.divEdit}>
                                            <span>Estado de entrega:</span>
                                            {editActive ?
                                                <EditOrder
                                                    initalState={order.status}
                                                    setEditarEntrega={setEditarEntrega}
                                                />
                                                : <span className={styles.spanStatus}>{order.status}</span>
                                            }
                                        </div>
                                        <div className={styles.divEdit}>
                                            <span>Estado de pago: </span>
                                            {
                                                editActive ?
                                                    <EditPayment
                                                        initalState={order.payment_status}
                                                        setEditPayment={setEditPayment}
                                                    />
                                                    : <span className={styles.spanStatus}>{traslate(order.payment_status)}</span>
                                            }
                                        </div>
                                    </div>
                                    {editActive ?
                                        <div>
                                            <button
                                                className={styles.btnDone}
                                                onClick={() => editOrder(order.id)}
                                            ><MdOutlineDone /></button>
                                            <button
                                                className={styles.btnClose}
                                                onClick={() => setEditActive(!editActive)}
                                            ><IoMdClose /></button>
                                        </div>
                                        : <div className={styles.divDone}></div>}
                                </div>
                                <MenuDesplegable
                                    order={order}
                                    editActive={editActive}
                                    setEditActive={setEditActive}
                                />
                            </div>
                        )
                    })}
                </>
                : <Loading />}
        </div>
    )
}