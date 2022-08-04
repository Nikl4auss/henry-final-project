import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {  useNavigate, useParams } from 'react-router-dom'
import { getProducts } from '../../../redux/actions'
import apiInstance from '../../../services/apiAxios'
import { getProduct } from '../../../services/productsServices'
import styles from './DeleteProduct.module.css'

export default function DeleteProduct () {
    const navigate = useNavigate()
    const {id} = useParams()
    const [ product, setProduct ] = useState({})
    let dispatch = useDispatch()

    useEffect(() => {
        getProduct(id).then(data => setProduct(data))
    }, [])

    async function deleteProduct () {
        const response = await apiInstance.delete(`/producto/${id}?status=disabled`)
        dispatch(getProducts({}, ''))
        navigate('/admin')
    }

    return(product.id &&
        <div className={styles.container}>
            <div className={styles.modalContainer}>
                <h1>¿Está seguro que desea eliminar el producto?</h1>
                <img src={product?.images[0]?.image} alt='producto' />
                <h2>{product?.name}</h2>
                <div className={styles.divBtn}>
                    <button 
                    className={styles.btnSi}
                    onClick={deleteProduct}>
                        SI
                    </button>
                    <button 
                    className={styles.btnNo}
                    onClick={() => navigate('/admin')}>
                        NO
                    </button>
                </div>
            </div>
        </div>
    )
}