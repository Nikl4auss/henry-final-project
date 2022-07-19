import { useLocalStorage } from "../../services/useStorage";
import { ProductItem } from "./productItem";

const producto = [{
    id: 234,
    stock_product: 3,
    Size: {name: "11"},
    MainColor: {name: "rojo"},
    quantity: 1
},
{
    id: 236,
    stock_product: 3,
    Size: {name: 111},
    MainColor: {name: 8},
    quantity: 2
},
{
    id: 459,
    stock_product: 5,
    Size: {name: 111},
    MainColor: {name: 5},
    quantity: 3
}]

export function ShopingCart () {
    const [cart] = useLocalStorage("cart")
// (conidicion) ? (valor true) : (valor false)
    return (
        <div>
            <div>
                { producto?.map((element) => <ProductItem 
                                            id={element.id} 
                                            color={element.MainColor.name} 
                                            size={element.Size.name}
                                            quantity={element.quantity}
                                            stock={element.stock_product}
                                            />)
                }
            </div>
            <button>Pagar</button>
        </div>
    )
}

