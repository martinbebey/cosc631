import { Button, Grid } from "@material-ui/core";
import CartItem from "./cartItem";

function Cart({ cart, handleUpdateProductQuantity, handleRemoveFromCart, emptyCart }) {

    if (cart.total_items === 0) {
        return <div>Your shopping cart is empty.</div>
    }

    if (!cart || !cart.total_items) {
        return <div>Loading the shopping cart...</div>
    }

    return (
        <Grid container direction="column" spacing={2}>
            {
                cart.line_items.map(
                    (cartItem) => {
                        return (
                            <CartItem key={cartItem.id} cartItem={cartItem}
                                handleRemoveFromCart={handleRemoveFromCart}
                                handleUpdateProductQuantity={handleUpdateProductQuantity} />
                        );
                    }
                )
            }

            <Grid item>
                <Button onClick={
                    () => {
                        emptyCart();
                    }
                }>
                    EMPTY CART
                </Button>

                <Button href="/checkout">
                    Checkout
                </Button>
            </Grid>
        </Grid>
    );
}

export default Cart;