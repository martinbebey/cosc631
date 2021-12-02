import { useState, useEffect } from 'react';
import { commerce } from "./../lib/commerce";
import { Button, MenuItem, Select, TextField } from "@material-ui/core";
import ReactPhoneInput from "react-phone-input-material-ui";

function ShippingForm({ checkoutToken, setShippingInfo }) {
    const [country, setCountry] = useState("");
    const [countries, setCountries] = useState(undefined);
    const [region, setRegion] = useState("");
    const [regions, setRegions] = useState(undefined);
    const [shippingMethod, setShippingMethod] = useState("");
    const [shippingMethods, setShippingMethods] = useState(undefined);
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(false);
    const [nameHelper, setNameHelper] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [emailHelper, setEmailHelper] = useState("");
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
    const [emailEntryIsValid, setEmailEntryIsValid] = useState(false);
    const [cityEntryIsValid, setCityEntryIsValid] = useState(false);
    const [addressEntryIsValid, setAddressEntryIsValid] = useState(false);
    const [zipEntryIsValid, setZipEntryIsValid] = useState(false);

    useEffect(() => {
        if (checkoutToken) {
            commerce.services.localeListShippingCountries(checkoutToken).then((response) => {
                setCountries(response["countries"]);
                setCountry(Object.keys(response["countries"])[0]);
            });
        }
    }, [checkoutToken]);

    useEffect(() => {
        if (country) {
            commerce.services.localeListShippingSubdivisions(checkoutToken, country).then((response) => {
                setRegions(response["subdivisions"]);
                setRegion(Object.keys(response["subdivisions"])[0]);
            });
        }
    }, [checkoutToken, country]);

    useEffect(() => {
        if (country && region) {
            commerce.checkout.getShippingOptions(checkoutToken, { "country": country, "region]": region }).then((response) => {
                setShippingMethods(response);
                setShippingMethod(response[0]["id"]);
            });
        }
    }, [checkoutToken, country, region]);

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
                <TextField
                    name="email field" label="Email"
                    onChange={(event) => { setEmail(event.target.value) }}
                    error={emailError}
                    helperText={emailHelper}
                    onBlur={onEmailFieldUnfocused}>
                </TextField>
            </p>

            <p>
                <ReactPhoneInput
                    component={TextField}
                    value={phone}
                    onChange={(enteredPhoneNumber) => { setPhone(enteredPhoneNumber) }}
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
                {country && countries && <Select
                    value={country}
                    onChange={(event) => { setCountry(event.target.value) }}>
                    {
                        Object.keys(countries).map((countryCode) => {
                            return <MenuItem value={countryCode} key={countryCode}>{countries[countryCode]}</MenuItem>
                        })
                    }
                </Select>}
            </p>

            <p>
                {region && regions && <Select
                    value={region}
                    onChange={(event) => { setRegion(event.target.value) }}>
                    {
                        Object.keys(regions).map((regionCode) => {
                            return <MenuItem value={regionCode} key={regionCode}>{regions[regionCode]}</MenuItem>
                        })
                    }
                </Select>}
            </p>

            <p>
                {shippingMethod && shippingMethods && <Select
                    value={shippingMethod}
                    onChange={(event) => { setShippingMethod(event.target.value) }}>
                    {
                        shippingMethods.map((method) => {
                            return <MenuItem value={method["id"]} key={method["id"]}>{method["description"]}</MenuItem>
                        })
                    }
                </Select>}
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
                            && addressEntryIsValid && zipEntryIsValid && emailEntryIsValid) {
                            setShippingInfo({
                                "name": name,
                                "email": email,
                                "phone": phone,
                                "address": address,
                                "city": city,
                                "country": country,
                                "region": region,
                                "shipping": shippingMethod,
                                "zip": zipCode
                            });
                        }

                        else {

                            onNameFieldUnfocused();
                            onEmailFieldUnfocused();
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