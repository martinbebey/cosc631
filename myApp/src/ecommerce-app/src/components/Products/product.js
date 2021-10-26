import { useEffect, useState } from 'react';
// import { commerce } from './../../lib/commerce';
import React from "react";
import {useParams} from "react-router";

function Product()
{
    const URLparameter = useParams(); 

    return (
        <p>{URLparameter}</p>
    );
    // const [products, setProduct] = useState([]); 
    // useEffect(() => { 
    //     commerce.products.retrieve(productId).then(result => { 
    //     console.log(result); 
    //     setProduct(result); 
    //     }); 
    // }, [productId]);

    // return (      
    //     products.map((product) => {
    //     return <img key ={product.id} src={product.image.url} alt={product.name} />
    //     })
    // );
}

export default Product;