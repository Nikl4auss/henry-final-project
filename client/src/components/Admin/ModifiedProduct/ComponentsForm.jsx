import { useCallback, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import CardToEdit from '../../Card/CardToEdit'
import styles from './modifyProduct.module.css'


export function FirstInputs({ name, description, price, modelo, handleInputsChange }) {
    return (
        <div>
            <label className={styles.labelInputs}>
                <span className={styles.spanNames}>Nombre*</span>
                <input
                    className={styles.inputs}
                    type='text'
                    name='name'
                    value={name}
                    onChange={handleInputsChange}
                />
            </label>
            <label className={styles.labelInputs}>
                <span className={styles.spanNames}>Descripción*</span>
                <textarea
                    className={styles.inputs}
                    spellcheck="false"
                    type="text"
                    name="description"
                    rows="5"
                    value={description}
                    onChange={handleInputsChange}
                />
            </label>
            <label className={styles.labelInputs}>
                <span className={styles.spanNames}>Precio*</span>
                <input
                    className={styles.inputs}
                    type="text"
                    name="price"
                    value={price}
                    onChange={handleInputsChange}
                />
            </label>
            <label className={styles.labelInputs}>
                <span className={styles.spanNames}>Modelo*</span>
                <input
                    className={styles.inputs}
                    type="text"
                    name="modelo"
                    value={modelo}
                    onChange={handleInputsChange}
                />
            </label>
        </div>
    )
}

export function ModifyBrand({ brands, brandSelected, handleBrandChange }) {
    return (
        <div>
            <div className={styles.labelInputs}>
                <span className={styles.spanNames}>Marca*</span>
                <select className={styles.selectBrand} defaultValue="empty" name='Brand' onChange={handleBrandChange}>
                    {brands.map((m, i) => (
                        <option
                            key={i}
                            value={m.name}
                            selected={brandSelected === m.name ? true : false}
                        >
                            {m.name}
                        </option>
                    ))}
                    <option value="Otra">Otra</option>
                </select>
            </div>
        </div>
    )
}

export function ModifyCategories({ categories, categoriesSelected, handleCategoriesChange, active, setActive }) {
    let categoriesLoaded = []
    const [categoriesToAdd, setCategoriesToAdd] = useState([...categoriesSelected])
    const [newCategory, setNewCategory] = useState('')
    const [otherActive, setOtherActive] = useState(false)

    categories?.forEach(cat => categoriesLoaded.push(cat.name))
    categoriesToAdd?.forEach(cat => {
        if (!categoriesLoaded.includes(cat)) categoriesLoaded.push(cat)
    })

    const isCheck = useCallback((category) => {
        if (categoriesToAdd?.length) {
            var check = categoriesToAdd?.includes(category)
        }
        return check
    }, [categoriesToAdd])

    const pushCategory = useCallback((e) => {
        if (e.target.checked) {
            setCategoriesToAdd([...categoriesToAdd, e.target.value])
        }
        else {
            const deleteGenre = categoriesToAdd.filter(el => el !== e.target.value)
            setCategoriesToAdd(deleteGenre)
        }
    }, [categoriesToAdd])

    function selectNewCategory(e) {
        e.preventDefault()
        setOtherActive(!otherActive)
    }

    function pushNewCategory(e) {
        e.preventDefault()
        if (!categoriesToAdd.includes(newCategory) && newCategory.length !== 0) {
            setCategoriesToAdd([...categoriesToAdd, newCategory])
            setNewCategory('')
            setOtherActive(!otherActive)
        }
    }

    function addCategories(e) {
        e.preventDefault()
        setOtherActive(!otherActive)
        handleCategoriesChange(categoriesToAdd)
        setActive(!active)
    }

    return (
        active &&
        <div className={styles.divContainerCategories}>
            <div className={styles.modalCategories}>
                <button
                    onClick={() => {
                        setActive(!active)
                        setOtherActive(!otherActive)
                    }}
                    className={styles.close}><IoMdClose /></button>
                <div className={styles.spanCategories}>
                    {categoriesToAdd?.join(', ')}
                </div>
                <div className={styles.divCheckboxs}>
                    {
                        categoriesLoaded?.map(cat => {
                            return (
                                cat !== 'other' ?
                                    <label className={styles.labelCategory}>
                                        <input
                                            type="checkbox"
                                            name={cat}
                                            value={cat}
                                            onClick={pushCategory}
                                            defaultChecked={isCheck(cat)}
                                        />
                                        {cat}
                                    </label> : <div></div>
                            )
                        })
                    }
                </div>
                {otherActive ? undefined : <button className={styles.btnCategory} onClick={selectNewCategory} value='other'>Nueva categoría</button>}

                {otherActive ? <div className={styles.addNewCategory}>
                    <label className={styles.labelInputs}>
                        Agregar nueva categoría:
                    </label>
                        <input
                            className={styles.inputAddNewCategory}
                            type='text'
                            onChange={(e) => setNewCategory(e.target.value)}
                            value={newCategory}
                        />
                    <button className={styles.btnCategory} onClick={pushNewCategory}>Agregar</button>
                </div> : undefined}
                <button className={styles.btnReady} onClick={addCategories}>Listo</button>
            </div>
        </div>

    )
}

export function ModifyStock({ stock, handleStockChange, handleNewStock }) {
    const [newStock, setNewStock] = useState({
        Size: {
            name: ''
        },
        MainColor: {
            name: '',
            code: '#000000'
        },
        stock_product: ''
    })

    function handleInputChange(e) {
        e.preventDefault()
        setNewStock({
            ...newStock,
            [e.target.name]: e.target.value
        })
    }

    function handleSizeChange(e) {
        e.preventDefault()
        setNewStock({
            ...newStock,
            Size: {
                name: e.target.value
            }
        })
    }

    function handleColorChange(e) {
        e.preventDefault()
        setNewStock({
            ...newStock,
            MainColor: {
                ...newStock.MainColor,
                [e.target.name]: e.target.value
            }
        })
    }

    stock?.sort((a, b) => a.Size?.name - b.Size?.name)

    return (
        <div>
            <h3 className={styles.spanNames}>Stock</h3>
            <div className={styles.divStock}>
                {
                    stock?.map(st => {
                        return (
                            <div>
                                <span className={styles.spanStock}>Talle: {st.Size?.name}</span>
                                <span className={styles.spanStock}>Color: {st.MainColor?.name}</span>
                                <label>
                                    <span>Cantidad: </span>
                                    <input
                                        className={styles.inputStock}
                                        type='number'
                                        min='0'
                                        id={st.id}
                                        value={st.stock_product}
                                        onChange={handleStockChange}
                                    />
                                </label>
                                <hr />
                            </div>
                        )
                    })
                }
                <div>
                    <label>
                        <span>Talle: </span>
                        <input
                            className={styles.inputStock}
                            type="number"
                            name='Size'
                            step='0.5'
                            min='11'
                            max='51'
                            value={newStock.Size.name}
                            onChange={handleSizeChange}
                        />
                    </label>
                    <label className={styles.labelColorStock}>
                        <span>Color: </span>
                        <input
                            className={styles.inputNameColor}
                            type="text"
                            name='name'
                            value={newStock.MainColor.name}
                            onChange={handleColorChange}
                        />
                        <input
                            type="color"
                            name="code"
                            value={newStock.MainColor.code}
                            onChange={handleColorChange}
                            className={styles.inputColor}
                            style={{ background: `${newStock.MainColor.code}` }}
                        />
                    </label>
                    <label>
                        <span>Cantidad: </span>
                        <input
                            className={styles.inputStock}
                            type="number"
                            min='0'
                            name='stock_product'
                            value={newStock.stock_product}
                            onChange={handleInputChange}
                        />
                    </label>
                    <button 
                    className={styles.btnCategory}
                    onClick={(e) => {
                        e.preventDefault()
                        if (!newStock.stock_product.length || !newStock.Size.name.length || !newStock.MainColor.name.length) return
                        if (newStock.MainColor.name !== 'Negro' && newStock.MainColor.code === '#000000') return
                        handleNewStock(e, newStock)
                        setNewStock({
                            Size: {
                                name: ''
                            },
                            MainColor: {
                                name: '',
                                code: '#000000'
                            },
                            stock_product: ''
                        })
                    }
                    }>Agregar</button>
                </div>
            </div>
        </div>
    )
}