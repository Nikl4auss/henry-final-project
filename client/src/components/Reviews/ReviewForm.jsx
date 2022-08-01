import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { createReview } from "../../services/reviewsServices";
import styles from "./Reviews.module.css";
import Stars from "../Stars/Stars";

const ReviewForm = ({ productId }) => {
  const [review, setReview] = useState({
    title: "",
    body: "",
    score: 0,
  });

  const { getAccessTokenSilently } = useAuth0();

  const onSubmit = (e) => {
    e.preventDefault();
    getAccessTokenSilently().then((token) => {
      console.log(token);
      createReview(review, productId, token).then(() => {
        setReview({
          title: "",
          body: "",
          score: 0,
        });
      });
    });
  };

  function handleChange(e) {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <>
      <p>Escribi tu reseña</p>
      <form onSubmit={onSubmit}>
        <Stars
          score={review.score}
          setScore={(score) => setReview({ ...review, score })}
          starstype={"dynamic"}
        />
        <div>
          <input
            className={styles.commentFormInput}
            placeholder="Título..."
            value={review.title}
            name="title"
            onChange={handleChange}
          />
        </div>
        <textarea
          className={styles.commentFormTextarea}
          placeholder="Descripción.."
          value={review.body}
          name="body"
          onChange={handleChange}
        />
        <button className={styles.commentFormButton}>Enviar reseña</button>
        {/* {hasCancelButton &&
              <button
                  type="button"
                  onClick={handleCancel}
              > 
              Cancelar
              </button>
          } */}
      </form>
    </>
  );
};

export default ReviewForm;
