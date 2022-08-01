import { useState, useEffect } from "react";
import { getReviews } from "./reviewsServices";

export function useFetchReviews(productId) {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getReviews(productId)
      .then((data) => {
        setReviews(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productId]);

  return [reviews, isLoading];
}
