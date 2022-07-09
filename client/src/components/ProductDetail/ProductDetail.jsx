import React from 'react'

function ProductDetail({name, description, model, price}) {
  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
      <p>{model}</p>
      <p>{price}</p>
    </div>
  )
}

export default ProductDetail