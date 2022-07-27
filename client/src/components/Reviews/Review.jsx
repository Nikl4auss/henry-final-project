import ReviewForm from "./ReviewForm";
import { useState } from "react";

import styles from './Reviews.module.css';
import { FaStar } from "react-icons/fa";

const Review = (
    {
        review, 
        currentUserId, 
        deleteReview,
        activeReview, 
        setActiveReview,
        updateReview,
        score,
    }) => {
    const fiveMinutes = 300000;
    const timePassed = new Date() - new Date(review.createdAt) > fiveMinutes;
    const canEdit = currentUserId === review.userId && !timePassed;
    const canDelete = currentUserId === review.userId && !timePassed;
    const createdAt = new Date(review.createdAt).toLocaleDateString();
    // const isEditing = 
    //     activeReview &&
    //     activeReview.type === "editing" &&
    //     activeReview.id === review.id;
    const stars = Array(5).fill(0)
    const colors = {
        orange: "#FFBA5A",
        grey: "#a9a9a9"
        
    };

    return(
    <div>
        <div className={styles.stars}>
        {stars.map((_, index) => {
            return (
                <FaStar
                    key={index}
                    size={14}
                    color={ score > index ? colors.orange : colors.grey}
                    style={{
                        marginRight: 10,
                    }}
                />
            )
        })}
        </div>
        <div className={styles.revTitle} >{review.title}</div>
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
            {canDelete && 
                <button 
                className={styles.commentDeleteButton}
                onClick={()=> deleteReview(review.id)}>
                Eliminar
                </button>}
        </div>
    </div>
    )
};

export default Review;