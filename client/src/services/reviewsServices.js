import apiInstance from "./apiAxios";

export async function getReviews(productId) {
    const { data } = await apiInstance.get(`/producto/${productId}/reviews`)
    return data
}


export async function createReview(review, productId, token) {

  const { data } = await apiInstance.post(`/product/${productId}/reviews`, review, {
    headers: {
        Authorization: `Bearer ${token}`
    }
  });

  return data
}