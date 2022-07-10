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
    model: ''
  })

  useEffect(() => {
    getProduct(id).then(res => {
      setProductDetail(res.data)
    })
  }, [id])
  return (
    <div>
      <h1>{productDetail.name}</h1>
      <p>{productDetail.description}</p>
      <p>{productDetail.model}</p>
      <p>{productDetail.price}</p>
    </div>
  )
}

export default ProductDetail
