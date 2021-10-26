import { useEffect, useState } from 'react';
import { commerce } from './../../lib/commerce';

function Products()
{     
    const [products, setProducts] = useState([]);

    useEffect(() => {
        commerce.products.list().then(result => {
        console.log("Retrieved the result");
        setProducts(result.data);
        });
    });

    return (      
        products.map((product) => {
        return <a key ={product.id} href={"/product/" + product.id}> <img src={product.image.url} alt={product.name} /> </a>
        })
    );
}

export default Products;