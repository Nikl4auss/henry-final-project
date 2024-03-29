import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useMemo, useState } from "react";
import { useLocalStorage } from "../../services/useStorage";
import styles from './ProductOptions.module.css'
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { useEffect } from "react";
import { setOrder, getCart } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import apiInstance from '../../services/apiAxios.js'
import { getProduct } from "../../services/productsServices";
import { useNavigate, useParams } from "react-router-dom";


export default function ProductOptions({ active, setActive, isProdDetail }) {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user, isAuthenticated } = useAuth0();
    const order = useSelector(state => state.order)
    const [cartLS, setCartLS] = useLocalStorage('cart', order)
    const [colorSelected, setColorSelected] = useState('')
    const [sizeSelected, setSizeSelected] = useState('')
    const [filterByColor, setFilterByColor] = useState([])
    const [filterBySize, setFilterBySize] = useState([])
    const [quantity, setQuantity] = useState(1)
    let dispatch = useDispatch()
    const [product, setProduct] = useState({})
    const ubication = window.location.pathname.split('/')[1]

    useEffect(() => {
        if (active && ubication === 'producto') { getProduct(id).then(data => setProduct(data)) }
        else if (ubication === 'inicio') getProduct(id).then(data => setProduct(data))
        setColorSelected('')
        setSizeSelected('')
        setFilterByColor([])
        setFilterBySize([])
        setQuantity(1)
        return () => {
            setProduct({})
            setColorSelected('')
            setSizeSelected('')
            setFilterByColor([])
            setFilterBySize([])
            setQuantity(1)
        }
    }, [active])

    console.log(product)

    let colors = []
    let sizes = []

    let stockFiltered = useMemo(() => {
        return [...filterByColor, ...filterBySize]
    }, [filterByColor, filterBySize])

    let sizesFiltered = useMemo(() => {
        return filterByColor.map(el => el.Size?.name)
    }, [filterByColor])

    let colorsFiltered = useMemo(() => {
        return filterBySize.map(el => el.MainColor?.name)
    }, [filterBySize])

    let idStockSelected = useMemo(() => {
        if (colorSelected.length !== 0 && sizeSelected.length !== 0) {
            return stockFiltered.find(el => el.MainColor.name === colorSelected && el.Size?.name === sizeSelected)
        } else return {}
    }, [sizeSelected, colorSelected])


    product?.Stocks?.forEach(el => {
        if (sizes.length === 0) sizes.push(el.Size?.name)
        if (colors.length === 0) colors.push(el.MainColor?.name)
        if (!colors?.includes(el.MainColor?.name)) colors.push(el.MainColor?.name)
        if (!sizes?.includes(el.Size?.name)) sizes.push(el.Size?.name)
    })

    sizes.sort((a, b) => a - b)

    function colorOptions(e, color) {
        e.preventDefault()
        if (colorSelected !== color) {
            setColorSelected(color)
            setFilterByColor(product?.Stocks?.filter(el => el.MainColor.name === color))
        } else {
            setColorSelected('')
            setFilterByColor([])
        }
    }

    function sizeOptions(e) {
        e.preventDefault()
        if (sizeSelected !== e.target.value) {
            setSizeSelected(e.target.value)
            setFilterBySize(product?.Stocks?.filter(el => el.Size?.name === e.target.value))
        } else {
            setSizeSelected('')
            setFilterBySize([])
        }
    }

    let addQuantity = (e) => {
        e.preventDefault()
        if (quantity < idStockSelected.stock_product) setQuantity(quantity + 1);
        else return;
    }

    let deleteQuantity = (e) => {
        if (quantity > 1) setQuantity(quantity - 1);
        else return;
    }

    async function addProductToCart() {
        if (isAuthenticated) {
            try {
                const response = await apiInstance.post(`/line_cart/${idStockSelected.id}`, {
                    id_Cart: user.sub,
                    quantity
                })
                if (response.data) {
                    dispatch(getCart(user.sub))
                    exit()
                }
            } catch (err) {
                console.log(err)
            }
        } else {
            let validateCart = cartLS.find(el => el.id === idStockSelected.id)
            if (validateCart) {

                let newCart = []
                cartLS?.forEach(el => {
                    if (el.id === idStockSelected.id) {
                        if (el.quantity + quantity > idStockSelected.stock_product) {
                            newCart.push({
                                ...el,
                                quantity: idStockSelected.stock_product
                            })
                        } else {
                            newCart.push({
                                ...el,
                                quantity: el.quantity + quantity
                            })
                        }
                    } else {
                        newCart.push({
                            ...el
                        })
                    }
                })
                setCartLS([...newCart])
                dispatch(setOrder([...newCart]))
                exit()
            } else {
                setCartLS([...order, {
                    ...idStockSelected,
                    quantity: quantity,
                    name: product.name,
                    price: product.price
                }])
                dispatch(setOrder([...order, {
                    ...idStockSelected,
                    quantity: quantity,
                    name: product.name,
                    price: product.price
                }]))
                exit()
            }
        }
    }

    function exit() {
        setColorSelected('')
        setSizeSelected('')
        setFilterByColor([])
        setFilterBySize([])
        setQuantity(1)
            (isProdDetail ? setActive(!active) : navigate('/inicio'))
    }

    let spanQuantity = useMemo(() => {
        return <span>{quantity}</span>
    }, [quantity])

    return (
        <>
            {product?.id &&
                <div className={styles.container}>
                    <div className={styles.modalContainer}>
                        <button
                            onClick={() => {
                                exit()
                            }}
                            className={styles.close}><IoMdClose /></button>
                        <div className={styles.divName}>
                            <img
                                className={styles.image}
                                src={product?.images[0]?.image} alt="Product" />
                            <h3 className={styles.title}>{product?.name}</h3>
                        </div>
                        <div className={styles.divColor}>
                            {colors?.map(color => {
                                let codeColor = product?.Stocks?.find(el => el.MainColor?.name === color)
                                return (
                                    <button
                                        className={
                                            styles.stockColor}
                                        onClick={
                                            colorsFiltered.length === 0 ? (e) => colorOptions(e, color) :
                                                colorsFiltered?.includes(color) ? (e) => colorOptions(e, color) : undefined}
                                        value={color}
                                    >
                                        <span
                                            className={colorSelected === color ? styles.colorSelected : styles.buttonColor}
                                            style={{ background: codeColor.MainColor.code }}
                                            value={color}
                                        ></span>
                                        <span className={colorsFiltered.length === 0 ? undefined :
                                            colorsFiltered?.includes(color) ? undefined : styles.noStockColor}>
                                        </span>
                                    </button>
                                )
                            })}
                        </div>
                        <div className={styles.divSize}>
                            {sizes?.map(size => {
                                return (
                                    <button
                                        className={sizeSelected === size ? styles.sizeIsSelected :
                                            sizesFiltered.length === 0 ? styles.stockSize :
                                                sizesFiltered?.includes(size) ? styles.stockSize : styles.noStockSize}
                                        value={size}
                                        onClick={
                                            sizesFiltered.length === 0 ? sizeOptions :
                                                sizesFiltered?.includes(size) ? sizeOptions : undefined}
                                    >{size}</button>
                                )
                            })}
                        </div>
                        <div className={styles.divQuantity}>
                            <div className={styles.quantity}>{spanQuantity}</div>
                            <div className={styles.divButtonQuantity}>
                                <button
                                    className={colorSelected.length > 0 && sizeSelected.length > 0 ? styles.btnQuantity : styles.notTouch}
                                    onClick={addQuantity}>
                                    <BsChevronUp />
                                </button>
                                <button
                                    className={colorSelected.length > 0 && sizeSelected.length > 0 ? styles.btnQuantity : styles.notTouch}
                                    onClick={deleteQuantity}>
                                    <BsChevronDown />
                                </button>
                            </div>
                        </div>
                        {product?.Stocks?.length > 0 ?
                            <button className={styles.addButton}
                                onClick={idStockSelected.id ? addProductToCart : undefined}
                            >Añadir al carrito</button>
                            : <button className={styles.buttonNone}

                            >Sin Stock</button>
                        }
                    </div>
                </div>
            }
        </>
    )
}