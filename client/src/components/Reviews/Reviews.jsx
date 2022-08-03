import Loading from "../Loading/Loading";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import Review from "./Review";
import styles from "./Reviews.module.css";
import { emptyReviews, getReviews } from '../../redux/actions/index'
const Reviews = ({ productId }) => {
  const reviews = useSelector(state => state.reviews)
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getReviews(productId))
    setIsLoading(false)
    return (() => {
      dispatch(emptyReviews())
    })
  }, [dispatch, productId])
  return (
    <div>
      <div className={styles.gralReviews}>
        {isLoading ? (
          <Loading />
        ) : reviews.length ? (
          reviews.map((review) => (
            <Review key={review?.id} {...review} />
          ))
        ) : (
          <div>
            <p>No hay reseñas</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
