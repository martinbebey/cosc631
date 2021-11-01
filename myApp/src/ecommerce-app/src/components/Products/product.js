import { useEffect, useState } from 'react';
import { commerce } from './../../lib/commerce';
import { useParams } from "react-router";
import { Grid } from '@material-ui/core';
import './../../App.css';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';

function Product() {
    const { productId } = useParams();
    const [product, setProduct] = useState([]);
    useEffect(() => {
        commerce.products.retrieve(productId).then(result => {
            console.log("This is the result: ->");
            console.log(result);
            setProduct(result);
        });
    }, [productId]);

    return (
        <div>
            {
                product.name &&
                <div>
                    <Grid container wrap="nowrap">

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <header>
                                <ImageGallery items={
                                    product.assets.map(
                                        (image) => {
                                            return {original: image.url};
                                        }
                                    )
                                } showPlayButton ={false} />
{/* 
                                {
                                    product.assets.map((image) => {
                                        return <img key={image.id} src={image.url} alt={image.filename} width="200" />
                                    })
                                } */}
                            </header>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6} direction="row-reverse">
                            <header>
                                <p>{product.name}</p>
                            </header>
                            <header>
                                <div dangerouslySetInnerHTML={{ __html: product.description }} />
                            </header>
                        </Grid>
                    </Grid>
                </div>

            }
        </div>
    );
}

export default Product;