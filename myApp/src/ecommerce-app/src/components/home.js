import { Grid } from "@material-ui/core";
import { useParams } from "react-router";
import { commerce } from "../lib/commerce";


function Home() {
    const { loginToken } = useParams();
    console.log(loginToken);

    commerce.customer.getToken(loginToken).then((jwt) => {
        console.log(jwt);
    });

    return (
        <Grid item>
            <h5> Home </h5>
            <h5> Welcome! user@email </h5>
        </Grid>

    );
}

export default Home;