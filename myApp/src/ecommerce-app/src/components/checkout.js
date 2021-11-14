import { Grid } from "@material-ui/core";
import { commerce } from "./../lib/commerce";
import { useEffect, useState } from 'react';
import ShippingForm from "./shippingForm";

function Checkout({ cart }) {
    const [checkoutToken, setToken] = useState({});
    const [shippingInfo, setShippingInfo] = useState({});
    useEffect(() => {
        commerce.checkout.generateToken(cart.id, { "type": "cart" }).then((response) => {
            console.log(response);
            console.log(response.id);
            setToken(response.id);
        });
    }, [cart.id]);

    return (

        <Grid container direction="column">
            <Grid item>
                Checkout
            </Grid>

            <Grid item>
                <ShippingForm checkoutToken={checkoutToken} setShippingInfo={setShippingInfo}/>
                <p>Submission summary:</p>
                {shippingInfo["country"] && <p>country: {shippingInfo["country"]}</p>}
                {shippingInfo["name"] && <p>name: {shippingInfo["name"]}</p>}
                {shippingInfo["zip"] && <p>zip: {shippingInfo["zip"]}</p>}
                {shippingInfo["phone"] && <p>phone: {shippingInfo["phone"]}</p>}
                {shippingInfo["city"] && <p>city: {shippingInfo["city"]}</p>}
                {shippingInfo["address"] && <p>address: {shippingInfo["address"]}</p>}
                {shippingInfo["region"] && <p>region: {shippingInfo["region"]}</p>}
                {shippingInfo["shipping"] && <p>shipping: {shippingInfo["shipping"]}</p>}
            </Grid>

            <Grid item>
                Placeholder for payment information
            </Grid>

            <Grid item>
                Placeholder for submission
            </Grid>
        </Grid>
    );
}

export default Checkout;