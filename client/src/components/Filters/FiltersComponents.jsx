export function BrandsComponent ( {brands, filtersSelectedToRender, handleSelectBrand}) {
    return (<div>
        <span>Marca</span>
        {brands.map((brand, index) => {
            if(filtersSelectedToRender.includes(brand)) return <div></div>
            return (
                <button 
                key={index}
                value={brand}
                onClick={handleSelectBrand}>
                    {brand}
                </button>
            )
        })}
    </div>)
}

export function CategoriesComponent ({ categories, filtersSelectedToRender, handleSelectCategory }) {
    return (
        <div>
            <span>Categoría</span>
            {categories.map((category, index) => {
                if(filtersSelectedToRender.includes(category)) return <div></div>
                return (
                    <button 
                    key={index}
                    value={category}
                    onClick={handleSelectCategory}>
                        {category}
                    </button>
                )
                })}
        </div>
    )
}