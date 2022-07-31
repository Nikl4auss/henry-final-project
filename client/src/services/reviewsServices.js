import apiInstance from "./apiAxios";

export async function getReviews(productId) {
    const { data } = await apiInstance.get(`/producto/${productId}/reviews`)
    return data
}

export async function createReview(review, productId) {
  const { data } = await apiInstance.post(`/producto/${productId}/reviews`, review);
  return data
}