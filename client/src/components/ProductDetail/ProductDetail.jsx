import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import {product} from '../../AuxiliaryVariables/Auxiliar'
import { getProduct } from '../../services/productsServices'
import styles from './ProductDetail.module.css'
import { BiCart } from "react-icons/bi";
import { IoMdHeartEmpty, IoMdHeart, IoMdStar, IoMdStarOutline, IoMdClose } from "react-icons/io";
import { TiChevronLeft, TiChevronRight } from "react-icons/ti";



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
      <div className={styles.grid}>
        <div className={styles.divClose}>
          <Link to= '/home'>
            <button className={styles.buttonClose}><IoMdClose/></button>
          </Link>
        </div>
        {/* <div className='buttonHome' >
          <Link to='/Home' className='btn'>◀ Volver a Inicio</Link>
        </div> */}
        <div className={styles.divHeart}>
            <button className={styles.buttonHeart}><IoMdHeartEmpty/></button>
        </div>
        {productDetail.name ? (
          <>
              <div className={styles.divImg}>
                {/* <ul>
                  {productDetail.images?.map(({image, main}, inx) => {
                    return <img key={inx} src={image} alt={productDetail.name} />
                  })}
                </ul> */}
                <button className={styles.arrowButtons}><TiChevronLeft/></button>
                <img className={styles.img} src={mainImage} alt="" />
                <button><TiChevronRight/></button>
              </div>        
              <div className={styles.divName}>
                <h1 className={styles.name}>{productDetail.name}</h1>
              </div>
              <div className={styles.divPrice}>
                <p className={styles.price}>${productDetail.price}</p>
              </div>
              <div className={styles.divStars}><IoMdStar/><IoMdStar/><IoMdStar/><IoMdStar/><IoMdStarOutline/></div>
              <div className={styles.divColorTitle}>Color</div>
              <div  className={styles.divColor} name="" id="">
                {productDetail.Stocks?.map(({MainColor}, inx) => {
                  if(MainColor?.name){
                    return <button  className={styles.stockColor} key={inx} value={MainColor.name}>
                      <span className= {styles.spanColor} style={{background:MainColor.code}}></span>
                      </button>
                  }
                  return null
                })}
              </div>
              <div className={styles.divSizeTitle}>Talle</div>
              <div className={styles.divSize} name="" id="">
                {productDetail.Stocks?.sort((a, b)=> a.Size.name-b.Size.name).map(({Size}, inx) => {
                  if(Size?.name){
                    return <button className={styles.stockSize} key={inx} value={Size.name}>{Size.name}</button>
                  }
                  return null
                })}
              </div>
                {/* <button className={`${styles.divBuy} ${styles.buy} `}>Comprar</button> */}
              
              <div className={styles.divAdd}>
                <button className={styles.add}>Agregar al carrito</button>
              </div>
              <div className={styles.divDescriptionTitle}>Descripción</div>
              <div className={styles.divDescription}>
                <p className={styles.description}>{productDetail.description}</p>
              </div>
              <div className={styles.divModelTitle}>Modelo n°</div>
              <div className={styles.divModel}>
                <p className={styles.model}>{productDetail.model}</p>
              </div>
              <div className={styles.divCommentsTitle}>Reseñas</div>
              <div className={styles.divComments} datacol={5} datarow={7}>
                <button className={styles.buttonComment}>Escribí tu reseña</button>
              </div>
            
          </>):<div>Cargando</div>}
          
        
      </div>
    </>
  )
  
}

export default ProductDetail
