import { Button, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    image: {
        width: 128,
        height: 128,
    },

    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },

    buttons: {
        display: 'flex',
        alignItems: 'center',
    },
});

function CartItem({ cartItem, handleUpdateProductQuantity, handleRemoveFromCart}) {
    const classes = useStyles();

    return (
        <Grid item container key={cartItem.id}>
            <Grid item xs={12} sm={4}>
                <div className={classes.image}>
                    <img src={cartItem.image.url} className={classes.img} alt="productImage"></img>
                </div>
            </Grid>

            <Grid item container xs={12} sm={6} direction="column">
                <Grid item >
                    {cartItem.name}
                </Grid>

                <Grid item >
                    <b>Quantity:</b> {cartItem.quantity}
                </Grid>

                <Grid item >
                    <b>Price:</b> {cartItem.line_total.formatted_with_symbol}
                </Grid>

                <Grid item>
                    <Button onClick={
                        () => {
                            handleUpdateProductQuantity(cartItem.id, cartItem.quantity - 1);
                        }
                    }>
                        -
                    </Button>

                    <Button onClick={
                        () => {
                            handleUpdateProductQuantity(cartItem.id, cartItem.quantity + 1);
                        }
                    }>
                        +
                    </Button>

                    <Button onClick={
                        () => {
                            handleRemoveFromCart(cartItem.id);
                        }
                    }>
                        REMOVE
                    </Button>
                </Grid>

            </Grid>
        </Grid>
    )
}

export default CartItem;