import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocalStorage } from '../../services/useStorage';
import styles from './Success.module.css';


export default function Success() {
    const [cart, setCart] = useLocalStorage('cart')

    useEffect(() => {
        setCart([])
    }, [])

    return (
        <div>
            <p>Su pago se realizó con éxito, muchas gracias!</p>
            <Link to='/home' className={styles.btn}>◀ Volver</Link>
        </div>
    )
}

