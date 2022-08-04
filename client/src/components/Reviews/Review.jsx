import styles from "./Reviews.module.css";
import Stars from "../Stars/Stars";

const Review = ({ title, body, score, createdAt }) => {

  const formatedDate = new Date(createdAt).toLocaleDateString('en-GB')

  return (
    <div>
      <div className={styles.stars}>
        <Stars score={score} starstype="static" />
      </div>
      <div className={styles.revTitle}>{title}</div>
      {body && <div className={styles.revBody}>{body}</div>}
      <div className={styles.revDate}>{formatedDate}</div>
    </div>
  );
};

export default Review;

