import { useState } from 'react';
import { TextField, Button, Grid } from '@material-ui/core';
import { commerce } from '../lib/commerce';

function Login() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [emailHelper, setEmailHelper] = useState("");
    const [emailEntryIsValid, setEmailEntryIsValid] = useState(false);
    const [loginToken, setLoginToken] = useState("");
    const url = "http://localhost:3000/user";

    const onEmailFieldUnfocused = (event) => {
        if (!email) {
            setEmailError(true);
            setEmailHelper("Please provide an email");
            setEmailEntryIsValid(false);
        }

        else {
            setEmailError(false);
            setEmailHelper("");
            setEmailEntryIsValid(true);
        }
    }

    return (
        <Grid item>
            {!loginToken && <div>
                <h4>Login</h4>

                <p>
                    <TextField
                        name="email field" label="Please enter your email"
                        onChange={(event) => { setEmail(event.target.value) }}
                        error={emailError}
                        helperText={emailHelper}
                        onBlur={onEmailFieldUnfocused}>
                    </TextField>
                </p>

                <p>
                    <Button onClick={
                        () => {

                            if (emailEntryIsValid) {
                                commerce.customer.login(email, url).then((token) => 
                                {
                                    console.log(token);
                                    setLoginToken(token);
                                });
                            }

                            else {
                                onEmailFieldUnfocused();
                            }
                        }
                    }>
                        Get Login Token
                    </Button>
                </p>
            </div>}

            {loginToken && <h5>An email is sent to your email address.</h5>}
        </Grid>
    )
}

export default Login;