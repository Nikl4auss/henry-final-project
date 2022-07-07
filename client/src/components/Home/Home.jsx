import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions";
import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

export default function Home(){
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.products)

    useEffect(()=> {
        dispatch(getProducts())
    }, [dispatch])

    return (
        <div>
            <h1>WELCOME</h1>
            <SearchBar/>
        </div>
    )
}