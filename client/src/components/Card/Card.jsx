import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import { FiHeart, FaHeart } from 'react-icons/fi'
import { IoCartOutline, IoCartSharp } from 'react-icons/io5'
import { useAuth0 } from "@auth0/auth0-react";
import { useLocalStorage } from '../../services/useStorage'
import { useState } from "react";
import ProductOptions from "../Modal/ProductOptions";

export default function Card({ id, name, price, image, brand, stock }) {
    const { isAuthenticated } = useAuth0();
    const [ cart ] = useLocalStorage('cart')
    const [ active, setActive ] = useState(false)
    console.log(cart)

    function productInCart(){
        if(cart?.length === 0) return false
        cart?.forEach(el => {
            stock.forEach(st => {
                if(st.id === el) return true;
            })
        });
    }

    if(stock.length > 0){
        return (
            <>
                    <div className={`${styles.card} ${styles.Card19}`} key={id}>
                        <div className={styles.iconContainer}>
                            { isAuthenticated ? 
                            <button className={styles.divIcon}>
                                <FiHeart/>
                            </button>
                            : undefined}      
                            <button 
                            onClick={() => setActive(!active)}
                            className={styles.divIcon} >
                                { productInCart() ? <IoCartSharp/> : <IoCartOutline /> }
                            </button>
                        </div>
                        <Link to={`/product/${id}`}>
                        <div className={`${styles.card__header} ${styles.card__header19}`}>
                            <div
                                className={styles.card__watermark}
                                data-watermark={brand?.split(" ")[0]}
                            ></div>
                            
                            <span
                                className={`${styles.card__subtitle} ${styles.card__willAnimate}`}></span>
                        </div>
                        <div className={styles.card__body}>
                            <img
                                className={`${styles.card__image} ${styles.card__willAnimate}`}
                                src={image}
                                alt="Zapatillas"
                            />
                            <h1 className={`${styles.card__title} ${styles.card__willAnimate}`}>
                                {name}
                            </h1>
                            <h1 className={`${styles.card__price} ${styles.card__willAnimate}`}>
                                $ {price}
                            </h1>
                            {/* <div
                                className={`${styles.card__wishList} ${styles.card__wishList19} ${styles.card__willAnimate}`}>
                                Agregar a Favoritos
                            </div> */}
                        </div>
                        </Link>
                    <Link to={`/admin/editarProducto/${id}`}>Editar</Link>
                    </div>
                <div className={styles.OptionsModal}>
                <ProductOptions 
                    stock={stock}
                    active={active}
                    setActive={setActive}
                    name={name}
                    price={price}
                    image={image}
                />
                
                </div>
            </>
        );
    }

}
