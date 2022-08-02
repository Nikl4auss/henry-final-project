import { useFetchReviews } from "../../services/useFetchReviews";
import Loading from "../Loading/Loading";
import Review from "./Review";
import ReviewForm from "./ReviewForm";
import styles from "./Reviews.module.css";

const Reviews = ({ productId }) => {
  const [reviews, isLoading] = useFetchReviews(productId);

  return (
    <div>
      <div className={styles.gralReviews}>
        {isLoading ? (
          <Loading />
        ) : reviews.length ? (
          reviews.map((review) => (
            <Review key={review.id} score={review.score} review={review} />
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
