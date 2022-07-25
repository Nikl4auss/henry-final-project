import { Link } from "react-router-dom";
import styles from "./Card.module.css";

export default function CardToEdit({ id, name, price, image, brand }) {
    return (
        <>
            <div className={`${styles.card} ${styles.Card19}`} key={id}>
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
                    </div>
                </Link>
            </div>
        </>
    );
}
