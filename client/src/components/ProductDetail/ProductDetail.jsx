import React from "react";
import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import ReviewForm from "../Reviews/ReviewForm";
import Reviews from "../Reviews/Reviews";
import { useAuth0 } from "@auth0/auth0-react";


import { getProduct } from "../../services/productsServices";
import styles from "./ProductDetail.module.css";
import { BiCart } from "react-icons/bi";
import {
  IoMdHeartEmpty,
  IoMdHeart,
  IoMdStar,
  IoMdStarOutline,
  IoMdClose,
} from "react-icons/io";
import { TiChevronLeft, TiChevronRight } from "react-icons/ti";
import ProductOptions from "../Modal/ProductOptions";
import verifyStock from "../../services/verifyStock";
import Loading from "../Loading/Loading";
import { GiScrollUnfurled } from "react-icons/gi";

function ProductDetail() {
  const { isAuthenticated } = useAuth0();
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState({
    name: "",
    price: 0.0,
    description: "",
    model: "",
    images: [],
    Stocks: []
  });
  const [active, setActive] = useState(false);
  const mainImage = productDetail?.images[0]?.image || "";

  useEffect(() => {
    window.scroll(0, 0);
  }, [])

  useEffect(() => {
    getProduct(id).then((data) => {
      setProductDetail(data);
    });

    return () => {
      setProductDetail({
        name: "",
        price: 0.0,
        description: "",
        model: "",
        images: [],
        Stocks: []
      })
    }
  }, [id]);

  let withStock = useMemo(() => {
    return verifyStock(productDetail.Stocks)
  }, [productDetail])

  return (
    <>
      <div className={styles.grid}>
        <div className={styles.divClose}>
          <Link to="/inicio">
            <button className={styles.buttonClose}>
              <IoMdClose />
            </button>
          </Link>
        </div>

        {/* <div className='buttonHome' >
          <Link to='/inicio' className='btn'>◀ Volver a Inicio</Link>
        </div> */}

        <div className={styles.divHeart}>
          <button className={styles.buttonHeart}>
            <IoMdHeartEmpty />
          </button>
        </div>
        {productDetail.name ? (
          <>
            <div className={styles.divImg}>
              <button className={styles.arrowButtons}>
                <TiChevronLeft />
              </button>
              <img className={styles.img} src={mainImage} alt="" />
              <button>
                <TiChevronRight />
              </button>
            </div>
            <div className={styles.divName}>
              <h1 className={styles.name}>{productDetail.name}</h1>
            </div>
            <div className={styles.divPrice}>
              <p className={styles.price}>${productDetail.price}</p>
            </div>
            {/* <div className={styles.divStars}>
              <IoMdStar />
              <IoMdStar />
              <IoMdStar />
              <IoMdStar />
              <IoMdStarOutline />
            </div> */}
            {/* <div className={styles.divColorTitle}>Color</div> */}
            <div className={styles.divAdd}>
              {productDetail.Stocks && withStock ?
                <button className={styles.add} onClick={() => setActive(!active)}>
                  Añadir al carrito
                </button>
                : <button className={styles.soldOut}>
                  Sin Stock
                </button>
              }
            </div>

            {<ProductOptions
              className={styles.ModalBox}
              initialState={productDetail}
              active={active}
              setActive={setActive}
              isProdDetail={active}
            
            />}
            <div className={styles.divDescriptionTitle}>Descripción</div>
            <div className={styles.divDescription}>
              <p className={styles.description}>{productDetail.description}</p>
            </div>
            <div className={styles.divModelTitle}>Modelo n°</div>
            <div className={styles.divModel}>
              <p className={styles.model}>{productDetail.model}</p>
            </div>

            {/* <div className={styles.divComments} datacol={5} datarow={7}>
                <button className={styles.buttonComment}>Escribí tu reseña</button>
              </div> */}
          </>
        ) : (
          <Loading />
        )}
      </div>
      <div className="p-5 flex flex-col m-auto gap-3 sm:w-3/4 md:w-1/2">
        <div className="">Reseñas</div>
        {isAuthenticated ?
        <ReviewForm productId={id} /> :
        <p style={{opacity: 0.3}}>Sólo usuarios que han iniciado sesion pueden realizar reseñas.</p>
        }
        <Reviews productId={id} />
      </div>
    </>
  );
}

export default ProductDetail;
