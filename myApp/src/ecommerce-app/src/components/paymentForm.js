import { loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements, ElementsConsumer } from "@stripe/react-stripe-js";
import { Button } from "@material-ui/core";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);


function PaymentForm({ setPaymentMethod }) {

    const handleCardSubmit = (event, stripe, elements) => {
        event.preventDefault();

        const cardElement = elements.getElement(CardElement);

        stripe.createPaymentMethod({ type: "card", card: cardElement }).then(
            ({ error, paymentMethod }) => {
                if (error) {
                    console.log(error);
                }

                else {
                    setPaymentMethod(paymentMethod);
                }
            }
        );
    }

    return (
        <Elements stripe={stripePromise}>
            <ElementsConsumer>
                {
                    ({ stripe, elements }) =>
                    (
                        <div>
                            <CardElement />
                            <Button onClick={(event) => handleCardSubmit(event, stripe, elements)}>Submit Card Payment</Button>
                        </div>
                    )
                }
            </ElementsConsumer>
        </Elements>
    );
}

export default PaymentForm;