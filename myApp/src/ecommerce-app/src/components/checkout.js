import { Button, Grid } from "@material-ui/core";
import { commerce } from "./../lib/commerce";
import { useEffect, useState } from 'react';
import ShippingForm from "./shippingForm";
import PaymentForm from "./paymentForm";

function Checkout({ cart }) {
    const [checkout, setCheckout] = useState({});
    const [checkoutToken, setCheckoutToken] = useState("");
    const [shippingInfo, setShippingInfo] = useState({});
    useEffect(() => {
        commerce.checkout.generateToken(cart.id, { "type": "cart" }).then((response) => {
            // console.log(response);
            // console.log(response.id);
            setCheckout(response);
            setCheckoutToken(response.id);
        });
    }, [cart.id]);

    const [paymentMethod, setPaymentMethod] = useState({});

    const handlePlaceOrder = (checkout, shippingInfo, paymentMethod) => 
    {
        console.log(checkout);
        console.log(shippingInfo);
        console.log(paymentMethod);

        const orderData = {
            "line_items": checkout.live.line_items,
            "customer": {
                "email": shippingInfo["email"]
            },
            "shipping": {
                "name": shippingInfo["name"],
                "street": shippingInfo["address"],
                "town_city": shippingInfo["city"],
                "country_state": shippingInfo["region"],
                "postal_zip_code": shippingInfo["zip"],
                "country": shippingInfo["country"],
            },
            "fulfillment": {
                "shipping_method": shippingInfo["shipping"],
            },
            "payment": {
                "gateway": 'stripe',
                "stripe": {
                    "payment_method_id": paymentMethod["id"]
                }
            }
        };

        console.log(orderData);

        commerce.checkout.capture(checkoutToken, orderData).then(
            (response) => {
                console.log(response);
            }
        )
    }

    if(!checkoutToken)
    {
        return <h4>Loading...</h4>
    }

    return (

        <Grid container direction="column">
            <Grid item>
                Checkout
            </Grid>

            <Grid item>
                { checkoutToken && <ShippingForm checkoutToken={checkoutToken} setShippingInfo={setShippingInfo}/>}
                <p>Submission summary:</p>
                {shippingInfo["country"] && <p>country: {shippingInfo["country"]}</p>}
                {shippingInfo["name"] && <p>name: {shippingInfo["name"]}</p>}
                {shippingInfo["zip"] && <p>zip: {shippingInfo["zip"]}</p>}
                {shippingInfo["phone"] && <p>phone: {shippingInfo["phone"]}</p>}
                {shippingInfo["city"] && <p>city: {shippingInfo["city"]}</p>}
                {shippingInfo["address"] && <p>address: {shippingInfo["address"]}</p>}
                {shippingInfo["region"] && <p>region: {shippingInfo["region"]}</p>}
                {shippingInfo["shipping"] && <p>shipping: {shippingInfo["shipping"]}</p>}
                {shippingInfo["email"] && <p>email: {shippingInfo["email"]}</p>}
            </Grid>

            <Grid item>
                <PaymentForm setPaymentMethod={setPaymentMethod}/>
            </Grid>

            <Grid item>
                <Button onClick={(event) => {handlePlaceOrder(checkout, shippingInfo, paymentMethod)}}>Confirm to place order</Button>
            </Grid>
        </Grid>
    );
}

export default Checkout;