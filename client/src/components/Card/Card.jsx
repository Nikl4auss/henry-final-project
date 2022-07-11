import { Link } from "react-router-dom";
import styles from './Card.module.css'

export default function Card ({ id, name, price, image}) {

    return (
        <Link to={`/product/${id}`}>
            <div className= {styles.cardContainer} key={id}>
                <img className= {styles.cardImg} src={image} alt='Zapatillas'/>
                <h3 className={styles.cardName} >{name}</h3>
                <span className={styles.cardPrice}>$ {price}</span>
            </div>
        </Link>
    )
}   