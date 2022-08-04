import axios from 'axios';
import { GET_BRANDS, GET_CATEGORIES, GET_PRODUCTS, ERROR, ADD_PAGE, SET_ORDER, GET_CART, GET_USERS, SET_PRODUCT, GET_REVIEWS, EMPTY_REVIEWS, ADD_REVIEW, SET_ID_ORDER } from './actions_types';
import { getProducts as apiGetProducts, getCategories as apiGetCategories, getBrands as apiGetBrands, getCart as apiGetCart } from '../../services/productsServices';
import { getUsers as apiGetUsers } from '../../services/usersServices'
import { getReviews as fetchReviews } from '../../services/reviewsServices'

export function getProducts(filters = {}, name) {

  return async function(dispatch) {
    try {
      const data = await apiGetProducts(filters, name)

      dispatch({
        type: GET_PRODUCTS,
        payload: data,
        filters: filters,
        name: name
      })

    } catch (error) {
      dispatch({
        type: ERROR,
        MessageError: error
      })
    }
  }
}

export function getCategories() {
  return async function(dispatch) {
    const data = await apiGetCategories()
    dispatch({
      type: GET_CATEGORIES,
      payload: data,
    })
  }
}

export function getBrands() {
  return async function(dispatch) {
    const data = await apiGetBrands()
    dispatch({
      type: GET_BRANDS,
      payload: data,
    })
  }
}

export function addPage(payload) {
  return {
    type: ADD_PAGE,
    payload: payload
  }
}

export function setOrder(payload) {
  return {
    type: SET_ORDER,
    payload: payload
  }
}

export function getCart(id) {
  return async function(dispatch) {
    const data = await apiGetCart(id)
    dispatch({
      type: GET_CART,
      payload: data,
    })
  }
}

export function getUsers() {
  return async function(dispatch) {
    try {
      const users = await apiGetUsers()
      dispatch({
        type: GET_USERS,
        payload: users
      })
    }
    catch (error) {
      console.log(error)
    }
  }
}

export function setProducts() {
  return {
    type: SET_PRODUCT
  }
}

export function getReviews(productId) {
  return async function(dispatch) {
    try {
      const data = await fetchReviews(productId)
      dispatch({
        type: GET_REVIEWS,
        payload: data
      })
    }

    catch (error) {
      console.log(error)
    }
  }
}

export function emptyReviews() {
  return {
    type: EMPTY_REVIEWS,
    payload: []
  }
}


export function addReview(review) {
  return {
    type: ADD_REVIEW,
    payload: review
  }

}
export function setIdOrder(payload) {
  return {
    type: SET_ID_ORDER,
    payload: payload
  }
}
