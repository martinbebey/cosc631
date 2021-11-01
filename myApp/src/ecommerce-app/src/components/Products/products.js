import { useEffect, useState } from 'react';
import { commerce } from './../../lib/commerce';
import { Card, CardActionArea, CardMedia, Grid } from "@material-ui/core";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    media: {
        height: 150,
    }
});

function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        commerce.products.list().then(result => {
            console.log("Retrieved the result");
            setProducts(result.data);
        });
    });


    return (
        <Grid container spacing={2}>
            {
                products.map((product) => {
                    return <ProductItem product={product} />
                })
            }
        </Grid>
    );
}

function ProductItem({ product }) {
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
                <CardActionArea href={"/product/" + product.id}>
                    <CardMedia className={classes.media} width="200" image={product.image.url} alt={product.name} />
                </CardActionArea>
            </Card>
        </Grid>
    );
}

export default Products;
export { ProductItem };