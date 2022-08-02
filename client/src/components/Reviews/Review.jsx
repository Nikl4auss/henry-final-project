import styles from "./Reviews.module.css";
import Stars from "../Stars/Stars";

const Review = ({ title, body, score, createdAt }) => {

  return (
    <div>
      <div className={styles.stars}>
        <Stars score={score} starstype="static" />
      </div>
      <div className={styles.revTitle}>{title}</div>
      {body && <div className={styles.revBody}>{body}</div>}
      <div className={styles.revDate}>{createdAt}</div>
      {/* {isEditing && (
            <ReviewForm 
                submitLabel="Guardar"
                hasCancelButton
                initialTitle={review.titulo}
                initialText={review.body}:w

                handleSubmit={(titulo, text)=> updateReview(titulo, text, review.id)}
                handleCancel={()=> setActiveReview(null)}
            />
        )} */}
      <div>
        {/* {canEdit && 
                <button 
                onClick={()=> setActiveReview({id:review.id, type: "editing"})}>
                Editar
                </button>} */}
      </div>
    </div>
  );
};

export default Review;
