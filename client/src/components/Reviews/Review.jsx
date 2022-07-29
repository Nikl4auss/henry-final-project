import styles from "./Reviews.module.css";
import Stars from "../Stars/Stars";

const Review = ({ review, currentUserId, deleteReview, score }) => {
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(review.createdAt) > fiveMinutes;
  const canDelete = currentUserId === review.userId && !timePassed;
  const createdAt = new Date(review.createdAt).toLocaleDateString();

  return (
    <div>
      <div className={styles.stars}>
        <Stars score={score} starstype="static" />
      </div>
      <div className={styles.revTitle}>{review.title}</div>
      <div className={styles.revBody}>{review.body}</div>
      <div className={styles.revDate}>{createdAt}</div>
      {/* {isEditing && (
            <ReviewForm 
                submitLabel="Guardar"
                hasCancelButton
                initialTitle={review.titulo}
                initialText={review.body}
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
        {canDelete && (
          <button
            className={styles.commentDeleteButton}
            onClick={() => deleteReview(review.id)}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};

export default Review;
