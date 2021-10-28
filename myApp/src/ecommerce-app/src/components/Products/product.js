import { useEffect, useState } from 'react';
import { commerce } from './../../lib/commerce';
import { useParams } from "react-router";

function Product() {
    const { productId } = useParams();
    const [product, setProduct] = useState([]);
    useEffect(() => {
        commerce.products.retrieve(productId).then(result => {
            console.log("This is the result: ->" + result.name);
            console.log("Product images -> " + result)
            console.log(result);
            setProduct(result);
        });
    }, [productId]);

    return (
        <div>
            {
                product.name &&
                <div>
                    <header>
                        <p>{product.name}</p>
                    </header>
                    <header>
                        <div dangerouslySetInnerHTML={{ __html: product.description }} />
                    </header>
                    <header>
                        {
                            product.assets.map((image) => {
                              return  <img key={image.id} src={image.url} alt={image.filename} />
                            })
                        }                    
                    </header>

                </div>
            }
        </div>
    );
}

export default Product;