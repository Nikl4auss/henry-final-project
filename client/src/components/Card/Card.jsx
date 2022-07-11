import { Link } from "react-router-dom";


export default function Card ({ id, name, price, image}) {

    return (
        <Link to={`/product/${id}`}>
            <div>
                <img src={image} alt='Zapatillas'/>
                <h3>{name}</h3>
                <span>$ {price}</span>
            </div>
        </Link>
    )
}   