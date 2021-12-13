import { Grid } from "@material-ui/core";
import { useParams } from "react-router";
import { commerce } from "../lib/commerce";
import { useEffect, useState } from 'react';
import Orders from "./orders";

function Home() {
    const { loginToken } = useParams();
    const [customerEmail, setCustomerEmail] = useState("");

    useEffect(() => {
        commerce.customer.getToken(loginToken).then((jwt) => {
            console.log(jwt);
        });
    });

    useEffect(() => {
        commerce.customer.about().then((customer) => {
            console.log(customer);
            setCustomerEmail(customer.email);
        });
    });


    return (
        <Grid item>
            {!customerEmail && <p>Please log in to view your order history</p>}
            {customerEmail && <Orders/>}
        </Grid>

    );
}

export default Home;