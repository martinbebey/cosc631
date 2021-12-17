import { commerce } from "./../lib/commerce";
import { useEffect, useState } from 'react';
import { TextField, Grid, Button, makeStyles } from "@material-ui/core";
import ReactPhoneInput from "react-phone-input-material-ui";

function Profile({ loggedIn }) {
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [nameError, setNameError] = useState(false);
    const [nameHelper, setNameHelper] = useState("");
    const [phoneError, setPhoneError] = useState(false);
    const [phoneHelper, setPhoneHelper] = useState("");
    const [phoneEntryIsValid, setPhoneEntryIsValid] = useState(false);
    const [nameEntryIsValid, setNameEntryIsValid] = useState(false);

    //style for the text for prefilled fields
    const useStyles = makeStyles({
        textColor: {
            color: 'gray'
        },

        inputLabel: {
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            width: '100%',
            color: 'red'
        },

        input: {
            '&::placeholder': {
                textOverflow: 'ellipsis !important',
                color: 'blue'
            }
        }

    });

    const classes = useStyles();

    useEffect(() => {
        commerce.customer.about().then((customer) => {
            setCustomerEmail(customer.email);
            setCustomerName(customer.firstname + " " + customer.lastname);
            setCustomerPhone(customer.phone);
        });
    });

    const onNameFieldUnfocused = (event) => {
        if (!customerName) {
            setNameError(true);
            setNameHelper("Name cannot be empty");
            setNameEntryIsValid(false);
        }

        else {
            setNameError(false);
            setNameHelper("");
            setNameEntryIsValid(true);
        }
    }

    const onPhoneFieldUnfocused = (event) => {
        if (!customerPhone) {
            setPhoneError(true);
            setPhoneHelper("Phone cannot be empty");
            setPhoneEntryIsValid(false);
        }

        else if (customerPhone.length !== 11) {
            setPhoneError(true);
            setPhoneHelper("Invalid phone number");
            setPhoneEntryIsValid(false);
        }

        else {
            setPhoneError(false);
            setPhoneHelper("");
            setPhoneEntryIsValid(true);
        }
    }

    const handleUpdate = (customerName, customerPhone) => {
        if (loggedIn && phoneEntryIsValid && nameEntryIsValid) {
            commerce.customer.update({
                firstname: customerName.split(" ")[0],
                lastname: customerName.split(" ")[1],
                phone: customerPhone,
            }, null).then((customer) => console.log(customer));
        }

        else {
            onNameFieldUnfocused();
            onPhoneFieldUnfocused();
        }
    }

    return (
        <div>
            {!loggedIn && <p>please log in to see your profile</p>}

            {loggedIn && <div>
                <p>
                    <TextField
                        name="name field"
                        label="Full Name"
                        value={customerName}
                        onChange={(event) => {setCustomerName(event.target.value) }}
                        error={nameError}
                        helperText={nameHelper}
                        onBlur={onNameFieldUnfocused}>
                    </TextField>
                </p>

                <p>
                    <TextField
                        name="email field"
                        label="eMail"
                        value={customerEmail}
                        InputProps={{ className: classes.textColor }}>
                    </TextField>
                </p>

                <p>
                    <ReactPhoneInput
                        component={TextField}
                        label="Phone"
                        value={customerPhone}
                        onChange={(enteredPhoneNumber) => { setCustomerPhone(enteredPhoneNumber) }}
                        inputProps={
                            {
                                fullWidth: false,
                                name: "phone field",
                                error: phoneError,
                                helperText: phoneHelper,
                                onBlur: onPhoneFieldUnfocused
                            }
                        }
                    >
                    </ReactPhoneInput>
                </p>

                <Grid item>
                    <Button
                        style={{ color: "blue" }}
                        onClick={(event) => { handleUpdate(customerName, customerPhone) }}>
                        Update
                    </Button>
                </Grid>
            </div>}
        </div >
    );
}

export default Profile;