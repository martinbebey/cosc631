import { Button, Grid } from "@material-ui/core";
import { commerce } from "./../lib/commerce";
import { useEffect, useState } from 'react';
import ShippingForm from "./shippingForm";
import PaymentForm from "./paymentForm";

function Checkout({ cart, loggedIn }) {
    const [checkout, setCheckout] = useState({});
    const [checkoutToken, setCheckoutToken] = useState("");
    const [shippingInfo, setShippingInfo] = useState({});
    const [paymentMethod, setPaymentMethod] = useState({});
    const [customerID, setCustomerID] = useState("");
    // const [email, setEmail] = useState("");
    // const [token, setToken] = useState("");
    // const url = "http://localhost:3000/checkout";

    useEffect(() => {
        commerce.checkout.generateToken(cart.id, { "type": "cart" }).then((response) => {
            setCheckout(response);
            setCheckoutToken(response.id);
        });
    }, [cart.id]);

    useEffect(() => {
        if (!loggedIn && customerID)//consider as new customer
        {
            // console.log(customerID);
            // console.log(email);

            // //to resolve the error "access token must be provided when customer is not logged in"
            // //provided customerID/null values to update function and it did not work
            // commerce.customer.login(email, url).then((token) => {
            //     console.log(token);
            //     setToken(token);
            // });

            commerce.customer.update({
                firstname: shippingInfo["name"].split(" ")[0],
                lastname: shippingInfo["name"].split(" ")[1],
                phone: shippingInfo["phone"],
            }, null).then((customer) => {
                console.log(customer)
            });

            // commerce.customer.logout();
        }
    }, [customerID, loggedIn, shippingInfo]);

    const handlePlaceOrder = (checkout, shippingInfo, paymentMethod) => {
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
                "county_state": shippingInfo["region"],
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
                setCustomerID(response.customer.id);
                // setEmail(response.customer.email);
                // console.log(response.customer.email);
            }
        );
    }

    if (!checkoutToken) {
        return <h4>Loading...</h4>
    }

    return (

        <Grid container direction="column">
            <Grid item>
                Checkout
            </Grid>

            <Grid item>
                {checkoutToken && <ShippingForm checkoutToken={checkoutToken} setShippingInfo={setShippingInfo} />}
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
                <PaymentForm setPaymentMethod={setPaymentMethod} />
            </Grid>

            <Grid item>
                <Button onClick={(event) => { handlePlaceOrder(checkout, shippingInfo, paymentMethod) }}>Confirm to place order</Button>
            </Grid>
        </Grid>
    );
}

export default Checkout;