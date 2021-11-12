import { useState } from 'react';
import { Button, MenuItem, Select, TextField } from "@material-ui/core";
import ReactPhoneInput from "react-phone-input-material-ui";

function ShippingForm({ checkoutToken, setShippingInfo }) {
    const [country, setCountry] = useState("USA");
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(false);
    const [nameHelper, setNameHelper] = useState("");
    const [phone, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState(false);
    const [phoneHelper, setPhoneHelper] = useState("");
    const [address, setAddress] = useState("");
    const [addressError, setAddressError] = useState(false);
    const [addressHelper, setAddressHelper] = useState("");
    const [city, setCity] = useState("");
    const [cityError, setCityError] = useState(false);
    const [cityHelper, setCityHelper] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [zipCodeError, setZipCodeError] = useState(false);
    const [zipCodeHelper, setZipCodeHelper] = useState("");
    const [phoneEntryIsValid, setPhoneEntryIsValid] = useState(false);
    const [nameEntryIsValid, setNameEntryIsValid] = useState(false);
    const [cityEntryIsValid, setCityEntryIsValid] = useState(false);
    const [addressEntryIsValid, setAddressEntryIsValid] = useState(false);
    const [zipEntryIsValid, setZipEntryIsValid] = useState(false);

    console.log(checkoutToken);

    const onNameFieldUnfocused = (event) => {
        if (!name) {
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

    const onAddressFieldUnfocused = (event) => {
        if (!address) {
            setAddressError(true);
            setAddressHelper("Address cannot be empty");
            setAddressEntryIsValid(false);
        }

        else {
            setAddressError(false);
            setAddressHelper("");
            setAddressEntryIsValid(true);
        }
    }

    const onCityFieldUnfocused = (event) => {
        if (!city) {
            setCityError(true);
            setCityHelper("City cannot be empty");
            setCityEntryIsValid(false);
        }

        else {
            setCityError(false);
            setCityHelper("");
            setCityEntryIsValid(true);
        }
    }

    const onZipCodeFieldUnfocused = (event) => {
        if (!zipCode) {
            setZipCodeError(true);
            setZipCodeHelper("Zip Code cannot be empty");
            setZipEntryIsValid(false);
        }

        else {
            setZipCodeError(false);
            setZipCodeHelper("");
            setZipEntryIsValid(true);
        }
    }

    const onPhoneFieldUnfocused = (event) => {
        if (!phone) {
            setPhoneError(true);
            setPhoneHelper("Phone cannot be empty");
            setPhoneEntryIsValid(false);
        }

        else if (phone.length !== 11) {
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

    return (

        <div>
            <p>Shipping Form</p>

            <p>
                <TextField
                    name="name field" label="Full Name"
                    onChange={(event) => { setName(event.target.value) }}
                    error={nameError}
                    helperText={nameHelper}
                    onBlur={onNameFieldUnfocused}>
                </TextField>
            </p>

            <p>
                <ReactPhoneInput
                    component={TextField}
                    value={phone}
                    onChange={(enteredPhoneNumber) => { setPhone(enteredPhoneNumber) }}
                    inputProps={
                        {
                            name: "phone field",
                            error: phoneError,
                            helperText: phoneHelper,
                            onBlur: onPhoneFieldUnfocused
                        }
                    }
                >
                </ReactPhoneInput>
            </p>

            <p>
                <TextField
                    name="address field"
                    label="Street Address"
                    onChange={(event) => { setAddress(event.target.value) }}
                    error={addressError}
                    helperText={addressHelper}
                    onBlur={onAddressFieldUnfocused}>
                </TextField>
            </p>

            <p>
                <TextField
                    name="city field"
                    label="City"
                    onChange={(event) => { setCity(event.target.value) }}
                    error={cityError}
                    helperText={cityHelper}
                    onBlur={onCityFieldUnfocused}>
                </TextField>
            </p>

            <p>
                <Select
                    value={country}
                    onChange={(event) => { console.log(event); setCountry(event.target.value) }}>
                    <MenuItem value="USA"> USA </MenuItem>
                    <MenuItem value="China"> China </MenuItem>
                </Select>
            </p>

            <p>
                <TextField
                    name="zip code field"
                    label="Zip Code"
                    onChange={(event) => { setZipCode(event.target.value) }}
                    error={zipCodeError}
                    helperText={zipCodeHelper}
                    onBlur={onZipCodeFieldUnfocused}>
                </TextField>
            </p>

            <p>
                <Button onClick={
                    () => {

                        if (phoneEntryIsValid && nameEntryIsValid && cityEntryIsValid 
                            && addressEntryIsValid && zipEntryIsValid) {
                            setShippingInfo({
                                "name": name,
                                "phone": phone,
                                "address": address,
                                "city": city,
                                "country": country,
                                "zip": zipCode
                            });
                        }

                        else {

                            onNameFieldUnfocused();
                            onPhoneFieldUnfocused();
                            onAddressFieldUnfocused();
                            onCityFieldUnfocused();
                            onZipCodeFieldUnfocused();
                        }
                    }
                }>
                    Use this shipping address
                </Button>
            </p>
        </div>



    );
}

export default ShippingForm;