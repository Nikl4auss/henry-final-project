import styles from './filters.module.css'

export function BrandsComponent ( {brands, filtersSelectedToRender, handleSelectBrand}) {
    return (<div className={styles.filtersEach}>
        <span className={styles.title}>Marca</span>
        {brands.map((brand) => {
            if(filtersSelectedToRender.includes(brand.name)) return undefined
            return (
                <button className={styles.btnFilters}
                key={brand.id}
                value={brand.name}
                onClick={handleSelectBrand}>
                    {brand.name}
                </button>
            )
        })}
    </div>)
}

export function CategoriesComponent ({ categories, filtersSelectedToRender, handleSelectCategory }) {
    return (
        <div className={styles.filtersEach}>
            <span className={styles.title}>Categoría</span>
            {categories.map((category) => {
                if(filtersSelectedToRender.includes(category.name)) return undefined
                return (
                    <button className={styles.btnFilters}
                    key={category.id}
                    value={category.name}
                    onClick={handleSelectCategory}>
                        {category.name}
                    </button>
                )
                })}
        </div>
    )
}