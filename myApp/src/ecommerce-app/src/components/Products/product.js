import { useEffect, useState } from 'react';
import { commerce } from './../../lib/commerce';
// import React from "react";
import {useParams} from "react-router";

function Product()
{
    const {productId} = useParams(); 

    // return (
    //     <p>{productId}</p>
    // );
    const [product, setProduct] = useState([]); 
    useEffect(() => { 
        commerce.products.retrieve(productId).then(result => { 
        console.log("This is the result: ->" + result.name); 
        setProduct(result);
        }); 
    }, [productId]);

        return (      

            <div> 
                <header>
                    <p>{product.name}</p>
                </header>
                <header>
                    <p>{product.description}</p>
                </header>
                {/* <header>
                    <img key ={product.id} src={product.image.url} alt={product.name} />
                </header> */}
                {/* <header>
                    <p>{product.price.raw}</p>
                </header> */}
                

            </div>
            //   {/* <div>{product.name}</div> */}
            //     {/* <div>{product.price.raw}</div> */}
            //     {/* <div>{product.description}</div> */}
            // products.map((product) => {
            // <img key ={product.id} src={product.image.url} alt={product.name} />
            // })
        );
    
}

export default Product;