import { Link, NavLink } from 'react-router-dom'
import styles from './cardProduct.module.css'
import MenuCardProduct from './MenuCardProduct'

export default function CardProduct({ image, name, price, brand, id, update, model, status }) {

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
                    <h2>
                        Estado del producto: 
                        {status === 'disabled' ? <span> Deshabilitado</span> : <span> Habilitado</span>}
                    </h2>
                    <p>Última modificación: {date[0]}</p>
                </div>
            </div>
            <div className={styles.divMenuCard}>
                <MenuCardProduct id={id} status={status}/>
            </div>
        </div>
    )
}