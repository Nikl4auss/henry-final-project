import { useEffect, useState } from "react";
import { getReviews, createReview, deleteReview as deleteReviewApi} from "./api";
import Review from "./Review";
import ReviewForm from "./ReviewForm";
import styles from './Reviews.module.css'


const Reviews = ({currentUserId}) => {
    const [apiReviews, setApiReviews] = useState ([])
    const [activeReview, setActiveReview] = useState(null);
    const rootReviews = apiReviews.filter((apiReview) => apiReview.parentId === null);

    const addReview = (currentValue, titulo, text, parentId) => {
        console.log('addReview', titulo, text, parentId)
        createReview(currentValue, titulo, text, parentId).then(review => {
            setApiReviews([review,  ...apiReviews]);
            setActiveReview(null)
        })
    }

    const deleteReview = (reviewId) => {
        if(window.confirm('Estás seguro que querés eliminar la reseña?')) {
            deleteReviewApi(reviewId).then(()=> {
                const updatedApiReviews = apiReviews.filter((apiReview) => apiReview.id !== reviewId);
                setApiReviews(updatedApiReviews);
            })
        }
    }
    useEffect(() => {
        getReviews().then(data => {
            setApiReviews(data);
        })
    }, [])
    return (
    <div>
        <div className={styles.writeYourReview}>Escribí tu reseña</div>
        <ReviewForm submitLabel="Enviar" handleSubmit={addReview} />
        <div className={styles.gralReviews} >
            {rootReviews.map((rootReview) => (
                <Review 
                key={rootReview.id}
                score={rootReview.score}
                review={rootReview}
                currentUserId={currentUserId}
                deleteReview={deleteReview}
                activeReview={activeReview}
                setActiveReview={setActiveReview}
                />
            ))}
        </div>
    </div>
    )
};

export default Reviews;