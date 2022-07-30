import { FaStar } from "react-icons/fa";

export const getReviews = async () => {
    return [
        {
            id: "1",
            score: 3, 
            stars: <FaStar/>,
            title: "1st review",
            body: "This is the body of the 1st review",
            parentId: null,
            userId: "1",
            createdAt: "01-07-2022"
        },
        {
            id: "2",
            score: 2, 
            stars: <FaStar/>,
            title: "2nd review",
            body: "This is the body of the 2nd review",
            parentId: null,
            userId: "2",
            createdAt: "01-07-2022"
        },
        {
            id: "3",
            score: 5, 
            stars: <FaStar/>,
            title: "3rd review",
            body: "This is the body of the 3rd review",
            parentId: null,
            userId: "3",
            createdAt: "01-07-2022"
        },
        {
            id: "4",
            score: 1, 
            stars: <FaStar/>,
            title: "4th review",
            body: "This is the body of the 4th review",
            parentId: null,
            userId: "4",
            createdAt: "01-07-2022"
        }
    ]
}

export const createReview = async (currentValue, titulo, text, parentId = null) => {
    return {
        id: Math.random().toString(36).substr(2, 9),
        score: currentValue,
        title: titulo,
        body: text,
        parentId: null, 
        userId: "1",
        createdAt: new Date().toISOString(),
    };
}

export const deleteReview = async () => {
    return {};
};