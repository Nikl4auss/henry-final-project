import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import {product} from '../../AuxiliaryVariables/Auxiliar'
import { getProduct } from '../../services/productsServices'

function ProductDetail() {
  const { id } = useParams()
  const [productDetail, setProductDetail] = useState({
    name: '',
    price: 0.00,
    description: '',
    model: '',
    images: []
  })


  const mainImage = productDetail.images[0]?.image || ''
  useEffect(() => {
    getProduct(id).then(data => {
      setProductDetail(data)
    })
  }, [id])
  return (
    <div>
    {productDetail.name ? (
      <div>
      <div>
        <div>
          {/* <ul>
            {productDetail.images?.map(({image, main}, inx) => {
              return <img key={inx} src={image} alt={productDetail.name} />
            })}
          </ul> */}
          <img src={mainImage} alt="" />
        </div>        
      </div>

      <div>
        <h1>{productDetail.name}</h1>
        <p>${productDetail.price}</p>
        <select name="" id="">
          {productDetail.Stocks?.map(({MainColor}, inx) => {
            if(MainColor?.name){
              return <option key={inx} value={MainColor.name}>{MainColor.code}{MainColor.name}</option>
            }
            return null
          })}
        </select>
        <select name="" id="">
          {productDetail.Stocks?.map(({Size}, inx) => {
            if(Size?.name){
              return <option key={inx} value={Size.name}>{Size.name}</option>
            }
            return null
          })}
        </select>

        <button type='button'>Comprar</button>
        <button type='button'>Agregar al Carrito</button>
      </div>
      <div>
        <p>{productDetail.description}</p>
        <p>{productDetail.model}</p>
      </div>
      </div>):<div>Cargando</div>}
    </div>
  )
  
}

export default ProductDetail
