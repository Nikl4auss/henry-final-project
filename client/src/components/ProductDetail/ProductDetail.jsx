import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import {product} from '../../AuxiliaryVariables/Auxiliar'
import { getProduct } from '../../services/productsServices'
import styles from './ProductDetail.module.css'

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
    <>
    <Link to= '/home'>
                <button className={styles.button}>Inicio</button>
            </Link>
    {/* <div className='buttonHome' >
      <Link to='/Home' className='btn'>◀ Volver a Inicio</Link>
    </div> */}
    
    <div>
    {productDetail.name ? (
      <div className={styles.divContainer}>
      <div>
      
        <div>
          {/* <ul>
            {productDetail.images?.map(({image, main}, inx) => {
              return <img key={inx} src={image} alt={productDetail.name} />
            })}
          </ul> */}
          <img className={styles.img} src={mainImage} alt="" />
        </div>        
      </div>

      <div className={styles.general}>
        <h1 className={styles.name}>{productDetail.name}</h1>
        <p className={styles.price}>${productDetail.price}</p>
        <select className={styles.stock} name="" id="">
          {productDetail.Stocks?.map(({MainColor}, inx) => {
            if(MainColor?.name){
              return <option  key={inx} value={MainColor.name}>{/*MainColor.code*/}{MainColor.name}</option>
            }
            return null
          })}
        </select>
        <select className={styles.stock} name="" id="">
          {productDetail.Stocks?.map(({Size}, inx) => {
            if(Size?.name){
              return <option  key={inx} value={Size.name}>{Size.name}</option>
            }
            return null
          })}
        </select>

        <button className={styles.buy} type='button'>Comprar</button>
        <button className={styles.add} type='button'>Agregar al Carrito</button>
      </div>
      <div className={styles.general}>
        <p className={styles.description}>{productDetail.description}</p>
        <p className={styles.model}>{productDetail.model}</p>
      </div>
      </div>):<div>Cargando</div>}
      
    </div>
    </>
  )
  
}

export default ProductDetail
