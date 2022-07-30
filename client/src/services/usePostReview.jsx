import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { createReview } from "./reviewsServices";
import { create } from "domain";

export default function usePostReviews() {
  const [newReview, setNewReview] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { getAccessTokenSilently } = useAuth0();

  function submitReview(review, productId) {
    getAccessTokenSilently().then((token) => {
      createReview(review, productId, token)
        .then((res) => {
          setNewReview(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  }

  return [submitReview, newReview, isLoading];
}
