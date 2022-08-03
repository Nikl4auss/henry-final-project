import { useDispatch } from 'react-redux'
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from 'react-toastify';
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
      toast.promise(
        createReview(review, productId, token),
        {
          pending: {
            render() {
              return 'Tu reseña se esta subiendo'
            }
          },
          success: {
            render({ data: newReview }) {
              dispatch(addReview(newReview))
              setReview({
                title: "",
                body: "",
                score: 0
              })
              return "Tu reseña fue publicada"
            }
          },
          error: {
            render({ data }) {
              console.log(data)
              return 'Lo sentimos, hubo un error y no pudo subirse su reseña'
            }
          }
        }
      )
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
        <button className={styles.commentFormButton} disabled={review.title.length > 0 ? false : true}>Enviar reseña</button>
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
