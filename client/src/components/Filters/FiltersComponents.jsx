import styles from './filters.module.css'

export function BrandsComponent ( {brands, filtersSelectedToRender, handleSelectBrand}) {
    return (
        <>
            <span className={styles.title}>Marca</span>
            <div className={styles.filtersEach}>
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
            </div>
        </>
    )
}

export function CategoriesComponent ({ categories, filtersSelectedToRender, handleSelectCategory }) {
    return (
        <>
        <span className={styles.title}>Categoría</span>
        <div className={styles.filtersEach}>
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
        </>
    )

}