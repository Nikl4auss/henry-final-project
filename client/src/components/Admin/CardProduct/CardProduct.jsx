import { Link, NavLink } from 'react-router-dom'
import styles from './cardProduct.module.css'

export default function CardProduct ({ image, name, price, brand, id, update, model }) {

    const date = update.split('T')

    return (
        <div key={id} className={styles.container}>
            <div className={styles.divInfoProduct}>
                <img className={styles.image} src={image} alt="product" />
                <div className={styles.dates}>
                    <h1>{name}</h1>
                    <h2>Modelo: {model}</h2>
                    <h3>Marca: {brand}</h3>
                </div>
                <div className={styles.finalDiv}>
                    <h2 className={styles.price}>${price}</h2>
                    <NavLink className={styles.link} to={`/admin/editarProducto/${id}`}>Editar Producto</NavLink>
                    <p>Última modificación: {date[0]}</p>
                </div>
            </div>
        </div>
    )
}