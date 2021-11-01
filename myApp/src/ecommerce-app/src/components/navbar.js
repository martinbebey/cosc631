import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import StorefrontIcon from '@material-ui/icons/Storefront';

function Navbar() {
    return (

        // <div style={{ color: "green" }}>
        <AppBar position="static">
            <Toolbar>
                <IconButton href="/">
                    <StorefrontIcon />
                </IconButton>
                <Typography>
                    <a style={{color:"white"}} href="/products">Shop</a>
                </Typography>
            </Toolbar>
            {/* <p>Navbar: <a href="/products">Products List</a></p> */}
        </AppBar>
        // </div>
    );
}

export default Navbar;