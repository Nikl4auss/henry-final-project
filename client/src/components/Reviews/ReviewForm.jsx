import { useState } from "react";
import styles from './Reviews.module.css'
import { FaStar } from "react-icons/fa";


const ReviewForm = ({
    handleSubmit, 
    submitLabel, 
    hasCancelButton = false, 
    initialStars= "",
    initialTitle= "",
    initialText = "", 
    handleCancel, 
    }) => {
    
    const [title, setTitle] = useState(initialTitle);
    const [text, setText] = useState(initialText);
    //para las stars
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);

    const isTexareaDisabled = text.length === 0 || title.length === 0;

    const onSubmit = e => {
        e.preventDefault()
        handleSubmit(currentValue, title, text)
        setCurrentValue(0)
        setTitle("")
        setText("")
    }

    const colors = {
        orange: "#FFBA5A",
        grey: "#a9a9a9"
        
    };
    const stars = Array(5).fill(0)
    const handleClick = value => {
        setCurrentValue(value)
    }
    const handleMouseOver = newHoverValue => {
        setHoverValue(newHoverValue)
    };
    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }
    
    return (
    <form onSubmit={onSubmit}>
        <div className={styles.stars}>
        {stars.map((_, index) => {
            return (
                <FaStar
                    key={index}
                    size={14}
                    onClick={() => handleClick(index + 1)}
                    onMouseOver={() => handleMouseOver(index + 1)}
                    onMouseLeave={handleMouseLeave}
                    color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                    style={{
                        marginRight: 10,
                        cursor: "pointer"
                    }}
                />
            )
        })}
        </div>
        <div>
        <input 
        className={styles.commentFormInput}
        placeholder="Título..."
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        />
        </div>
        <textarea 
        className={styles.commentFormTextarea}
        placeholder="Descripción.."
        value={text}
        onChange={(e)=>setText(e.target.value)}
        />
        <button className={styles.commentFormButton} disabled={isTexareaDisabled}>{submitLabel}</button>
        {/* {hasCancelButton &&
            <button
                type="button"
                onClick={handleCancel}
            > 
            Cancelar
            </button>
        } */}
    </form>
    )
};

export default ReviewForm;