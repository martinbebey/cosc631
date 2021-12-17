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
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");

    useEffect(() => {
        commerce.checkout.generateToken(cart.id, { "type": "cart" }).then((response) => {
            setCheckout(response);
            setCheckoutToken(response.id);
        });
    }, [cart.id]);

    //if customer is logged in, get the name, email and phone
    useEffect(() => {
        commerce.customer.about().then((customer) => {
            setCustomerEmail(customer.email);
            setCustomerName(customer.firstname + " " + customer.lastname);
            setCustomerPhone(customer.phone);
        });
    });

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

        //save new customer info
        if (!loggedIn) {
            orderData.customer.phone = shippingInfo["phone"];
            orderData.customer.firstname = shippingInfo["name"].split(" ")[0];
            orderData.customer.lastname = shippingInfo["name"].split(" ")[1];
        }

        console.log(orderData);

        commerce.checkout.capture(checkoutToken, orderData).then(
            (response) => {
                console.log(response);
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
                {checkoutToken && <ShippingForm checkoutToken={checkoutToken}
                    setShippingInfo={setShippingInfo} loggedIn={loggedIn}
                    customerName={customerName} customerEmail={customerEmail}
                    customerPhone={customerPhone} />
                }
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