import { AppBar, IconButton, Toolbar, Typography, Badge } from "@material-ui/core";
import StorefrontIcon from '@material-ui/icons/Storefront';
import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone';
import { Button } from "@material-ui/core";

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

                <Button style={{ color: "white" }} href="/login">
                    LOGIN
                </Button>
            </Toolbar>
            {/* <p>Navbar: <a href="/products">Products List</a></p> */}
        </AppBar>
        // </div>
    );
}

export default Navbar;