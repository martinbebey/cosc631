import { AppBar, IconButton, Toolbar, Typography, Badge } from "@material-ui/core";
import StorefrontIcon from '@material-ui/icons/Storefront';
import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone';
import { Button } from "@material-ui/core";
import { commerce } from "../lib/commerce";
import { useState, useEffect } from "react";

function Navbar({ cartItems }) {
    const [loggedIn, setLoggedIn] = useState({});
    const isLoggedIn = commerce.customer.isLoggedIn();

    useEffect(() => {
            setLoggedIn(commerce.customer.isLoggedIn());
    }, [isLoggedIn]);

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton href="/">
                    <StorefrontIcon />
                </IconButton>

                <Typography>
                    <a style={{ color: "white" }} href="/products">Shop</a>
                    <IconButton href="/cart">
                        <Badge badgeContent={cartItems} color="secondary">
                            <ShoppingCartTwoToneIcon />
                        </Badge>
                    </IconButton>
                </Typography>

                {!loggedIn && <Button style={{ color: "white" }} href="/login">
                    LOGIN
                </Button>}

                {loggedIn && <Button style={{ color: "white" }} href="/products" onClick={
                        () => {
                            commerce.customer.logout();
                        }
                    }>
                    LOGOUT
                </Button>}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;