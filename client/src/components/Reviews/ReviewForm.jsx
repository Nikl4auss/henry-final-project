import { useDispatch } from 'react-redux'
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { createReview } from "../../services/reviewsServices";
import styles from "./Reviews.module.css";
import Stars from "../Stars/Stars";
import { addReview } from '../../redux/actions/index'
const ReviewForm = ({ productId }) => {
  const [review, setReview] = useState({
    title: "",
    body: "",
    score: 0,
  });
  const dispatch = useDispatch()

  const { getAccessTokenSilently } = useAuth0();

  const onSubmit = (e) => {
    e.preventDefault();
    getAccessTokenSilently().then((token) => {
      createReview(review, productId, token).then((newReview) => {
        dispatch(addReview(newReview))
        setReview({
          title: "",
          body: "",
          score: 0,
        });
      })
        .catch(error => {
          window.alert('No se pudo crear la review')
          console.log(error)
        })
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
