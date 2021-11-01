import { AppBar, IconButton, Toolbar, Typography, Badge } from "@material-ui/core";
import StorefrontIcon from '@material-ui/icons/Storefront';
import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone';

function Navbar({ cartItems }) {
    return (

        // <div style={{ color: "green" }}>
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
            </Toolbar>
            {/* <p>Navbar: <a href="/products">Products List</a></p> */}
        </AppBar>
        // </div>
    );
}

export default Navbar;