import { Grid } from "@material-ui/core";
import { useParams } from "react-router";
import { commerce } from "../lib/commerce";
import { useEffect, useState } from 'react';

function Home() {
    const { loginToken } = useParams();
    const [customerEmail, setCustomerEmail] = useState("");

    useEffect(() => {
        commerce.customer.getToken(loginToken).then((jwt) => {
            console.log(jwt);
        });
    }, [loginToken]);

    useEffect(() => {
        commerce.customer.about().then((customer) => {
            console.log(customer);
            setCustomerEmail(customer.email);
        });
    });


    return (
        <Grid item>
            <h5> Home </h5>
            {customerEmail && <h5> Welcome! {customerEmail} </h5>}
        </Grid>

    );
}

export default Home;