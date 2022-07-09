import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getBrands, getCategories, getProducts } from "../../actions"
import { BrandsComponent, CategoriesComponent } from "./FiltersComponents"
import styles from './filters.module.css'


export default function Filters () {
    let nameState = useSelector(state => state.name)
    let brands = useSelector(state => state.brands)
    let categories = useSelector(state => state.categories)
    let filtersSelected = useSelector(state => state.filtersSelected)
    let dispatch = useDispatch()

    const [filtersToApply, setFiltersToApply ] = useState(filtersSelected)
    const [filtersSelectedToRender, setFiltersSelectedToRender ] = useState([])

    useEffect(() => {
        dispatch(getProducts(filtersToApply, nameState))
        dispatch(getBrands())
        dispatch(getCategories())
    }, [dispatch, filtersToApply, nameState])

    function handleSelectCategory (e) {
        e.preventDefault()
        setFiltersToApply({...filtersToApply, 
            category: [...filtersToApply.category, e.target.value]
        })
        setFiltersSelectedToRender([...filtersSelectedToRender, e.target.value])
    }

    function handleSelectBrand(e) {
        e.preventDefault()
        setFiltersToApply({...filtersToApply, 
            brand: [...filtersToApply.brand, e.target.value]
        })
        setFiltersSelectedToRender([...filtersSelectedToRender, e.target.value])
    }

    const handleDeleteFilter = (e) => {
            e.preventDefault()
            setFiltersSelectedToRender(filtersSelectedToRender.filter(filter => filter !== e.target.value))
            if(filtersToApply.category.includes(e.target.value)) {
                setFiltersToApply({
                    ...filtersToApply,
                    category: filtersToApply.category.filter(el => el !== e.target.value)
                })
            }
            if(filtersToApply.brand.includes(e.target.value)) {
                setFiltersToApply({
                    ...filtersToApply,
                    brand: filtersToApply.brand.filter(el => el !== e.target.value)
                })
            }
        }

    return(
        <div className={styles.divFilters}>
            <div>
                {filtersSelectedToRender.length > 0 ? 
                filtersSelectedToRender.map((filter, index) => {
                    return (
                        <div key={index}>
                            <button 
                            value={filter}
                            onClick={handleDeleteFilter}>{filter} x</button>
                            <span></span>
                        </div>
                    )
                }) 
                :
                <div></div>
            }
            </div>
            <BrandsComponent 
                handleSelectBrand = {handleSelectBrand}
                brands = {brands}
                filtersSelectedToRender = {filtersSelectedToRender}
            />
            <CategoriesComponent 
                handleSelectCategory = {handleSelectCategory}
                categories = {categories}
                filtersSelectedToRender = {filtersSelectedToRender}
            />
        </div>
    )
}