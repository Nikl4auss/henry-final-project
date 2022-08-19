import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getBrands, getCategories, getProducts, addPage } from "../../redux/actions"
import { BrandsComponent, CategoriesComponent } from "./FiltersComponents"
import styles from './filters.module.css'
import { useSessionStorage } from "../../services/useStorage"


function Filters() {
    let name = useSelector(state => state.name)
    let brands = useSelector(state => state.brands)
    let categories = useSelector(state => state.categories)
    let filtersSelected = useSelector(state => state.filtersSelected)
    let dispatch = useDispatch()

    const [filtersToApply, setFiltersToApply] = useSessionStorage('filtersSelected', filtersSelected)
    const [filtersSelectedToRender, setFiltersSelectedToRender] = useSessionStorage('filter', '')


    useEffect(() => {
        dispatch(getBrands())
        dispatch(getCategories())
        dispatch(getProducts(filtersToApply, name))
    }, [dispatch, filtersToApply])

    function handleSelectCategory(e) {
        e.preventDefault()
        setFiltersToApply({
            ...filtersToApply,
            category: [...filtersToApply.category, e.target.value]
        })
        setFiltersSelectedToRender([...filtersSelectedToRender, e.target.value])
        dispatch(addPage({ firstValue: 0, lastValue: 12 }))
    }

    function handleSelectBrand(e) {
        e.preventDefault()
        setFiltersToApply({
            ...filtersToApply,
            brand: [...filtersToApply.brand, e.target.value]
        })
        setFiltersSelectedToRender([...filtersSelectedToRender, e.target.value])
        dispatch(addPage({ firstValue: 0, lastValue: 12 }))
    }

    const handleDeleteFilter = (e) => {
        e.preventDefault()
        setFiltersSelectedToRender(filtersSelectedToRender.filter(filter => filter !== e.target.value))
        if (filtersToApply.category.includes(e.target.value)) {
            setFiltersToApply({
                ...filtersToApply,
                category: filtersToApply.category.filter(el => el !== e.target.value)
            })
        }
        if (filtersToApply.brand.includes(e.target.value)) {
            setFiltersToApply({
                ...filtersToApply,
                brand: filtersToApply.brand.filter(el => el !== e.target.value)
            })
        }
    }

    return (
        <div className={styles.divFilters}>
            <div >
                <div className={styles.filterSelected}> 
                    {filtersSelectedToRender.length > 0 ?
                        filtersSelectedToRender.map((filter, index) => {
                            return (
                                <div className={styles.buttonsSelected}
                                    key={index}>
                                    <button
                                        value={filter}
                                        onClick={handleDeleteFilter}>{filter} x</button>
                                    <span></span>
                                </div>
                            )
                        })
                        :
                        undefined
                    }
                </div>
                <BrandsComponent
                    handleSelectBrand={handleSelectBrand}
                    brands={brands}
                    filtersSelectedToRender={filtersSelectedToRender}
                />
                <CategoriesComponent
                    handleSelectCategory={handleSelectCategory}
                    categories={categories}
                    filtersSelectedToRender={filtersSelectedToRender}
                />
            </div>
        </div>
    )
}

export default React.memo(Filters)