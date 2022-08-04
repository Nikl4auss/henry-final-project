import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import { getProduct, putProduct } from "../../../services/productsServices";
import { getBrands, getCategories } from '../../../redux/actions'
import { FirstInputs, ModifyBrand, ModifyCategories, ModifyStock } from "./ComponentsForm";
import { IoArrowBackOutline, IoConstructOutline } from "react-icons/io5";
import CardToEdit from "../../Card/CardToEdit";
import styles from './modifyProduct.module.css';
import validate from "../../../services/validate";

export default function ModifyProduct() {
    const { id } = useParams()
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    let dispatch = useDispatch()
    const brands = useSelector((state) => state.brands)
    const categories = useSelector((state) => state.categories)
    const [errors, setErrors] = useState({})
    const [inputs, setInputs] = useState({})
    const [active, setActive] = useState(false)
    const [isEqual, setIsEqual] = useState(false)

    useEffect(() => {
        dispatch(getBrands())
        dispatch(getCategories())
        getProduct(id).then(data => {
            console.log(data)
            setInputs({
                ...data,
                Categories: data.Categories?.map(cat => cat.name)
            })
        })
    }, [dispatch])

    function handleBrandChange(e) {
        e.preventDefault()
        const otherBrand = {
            ...inputs,
            [e.target.name]: {
                name: e.target.value
            }
        }
        setInputs(otherBrand)
    }

    function handleInputsChange(e) {
        e.preventDefault()
        const newInput = {
            ...inputs,
            [e.target.name]: e.target.value
        }
        setInputs(newInput)
        setErrors({
            ...errors,
            [e.target.name]: undefined
        })
    }

    function handleCategoriesChange(categories) {
        const newCategories = {
            ...inputs,
            Categories: categories
        }
        setInputs(newCategories)
    }

    function handleStockChange(e) {
        let newStock = []
        inputs.Stocks.forEach(st => {
            if (parseInt(e.target.id) === st.id) {
                newStock.push({
                    ...st,
                    stock_product: parseInt(e.target.value)
                })
            }
            else newStock.push(st)
        })
        setInputs({
            ...inputs,
            Stocks: newStock
        })
    }

    function handleNewStock(e, stock) {
        e.preventDefault()
        let stockToAdd = []
        const newStock = { ...stock, id: parseInt(stock.MainColor.name.length + stock.Size.name) }
        inputs.Stocks.forEach(st => {
            console.log(st)
            if (st.Size.name === newStock.Size.name && st.MainColor?.name.toLowerCase() === newStock.MainColor?.name.toLowerCase()) {
                stockToAdd.push({
                    ...st,
                    stock_product: st.stock_product + parseInt(newStock.stock_product)
                })
                setIsEqual(true)
            } else {
                stockToAdd.push(st)
            }
        })
        if (!isEqual) {
            stockToAdd.push(newStock)
        }
        setInputs({
            ...inputs,
            Stocks: stockToAdd
        })
    }

    async function editProduct(e) {
        e.preventDefault()
        // setErrors(validate(inputs))

        try {
            const token = await getAccessTokenSilently()
            const data = await putProduct(inputs, token)
            setInputs({
                ...data
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.divContainer}>
            <div className={styles.backDiv}>
            <NavLink className={styles.back} to='/admin'><IoArrowBackOutline /> Inicio</NavLink>
            </div>
            <h1 className={styles.titlePage}>Editar producto</h1>
            <div className={styles.container}>
                <div>
                    <form >
                        {inputs.id ?
                            <>
                                <FirstInputs
                                    name={inputs?.name}
                                    description={inputs?.description}
                                    price={inputs?.price}
                                    modelo={inputs?.model}
                                    handleInputsChange={handleInputsChange}
                                />
                                <ModifyBrand
                                    brands={brands}
                                    brandSelected={inputs?.Brand?.name}
                                    handleBrandChange={handleBrandChange}
                                />
                                <div className={styles.marginDivCategories}>
                                    <span className={styles.spanNames}>Categorías*: </span>
                                    <span className={styles.spanCategories}>
                                        {inputs.Categories?.join(', ')}
                                    </span>
                                    <button
                                        className={styles.btnCategory}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setActive(!active)
                                        }
                                        }>Editar categorías
                                    </button>
                                </div>
                                <ModifyCategories
                                    categories={categories}
                                    categoriesSelected={inputs?.Categories}
                                    handleCategoriesChange={handleCategoriesChange}
                                    active={active}
                                    setActive={setActive}
                                />
                                <ModifyStock
                                    stock={inputs?.Stocks}
                                    handleStockChange={handleStockChange}
                                    handleNewStock={handleNewStock}
                                />
                            </>
                            : undefined}
                    </form>
                </div>
                <div className={styles.positionCard}>
                    {inputs.id ?
                        <CardToEdit
                            key={inputs?.id}
                            id={inputs?.id}
                            name={inputs?.name}
                            image={inputs?.images[0]?.image}
                            price={inputs?.price}
                            brand={inputs?.brand}
                        /> : <div>Cargando...</div>}
                </div>
            </div >
            <div className={styles.divBtnReady}>
            <button onClick={editProduct} className={styles.btnReady}>Listo</button>
            </div>
        </div>
    )
}