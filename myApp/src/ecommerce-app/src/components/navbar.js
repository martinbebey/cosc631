import { AppBar, IconButton, Toolbar, Typography, Badge } from "@material-ui/core";
import StorefrontIcon from '@material-ui/icons/Storefront';
import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Button } from "@material-ui/core";
import { commerce } from "../lib/commerce";

function Navbar({ cartItems, loggedIn}) {

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

                {loggedIn && <Button style={{ color: "white" }} href="/home">
                    ORDERS
                </Button>}

                {loggedIn && <Button href="/profile">
                    <AccountCircleIcon/>
                </Button>}

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