import { useState } from 'react';
import { Button, MenuItem, Select, TextField } from "@material-ui/core";

function ShippingForm({ checkoutToken, setShippingInfo }) {
    const [country, setCountry] = useState("1");
    const [name, setName] = useState("Undefined");
    console.log(checkoutToken);

    return (

        <div direction="column">
            <Select value={country} onChange={(event) => {console.log(event); setCountry(event.target.value) }}>
                <MenuItem value="1"> country 1 </MenuItem>
                <MenuItem value="2"> country 2 </MenuItem>
            </Select>

            <TextField name="name field" label="Full Name" onChange={(event) => {setName(event.target.value) }}>
            </TextField>

            <Button onClick={
                () => {
                    setShippingInfo({
                        "name": name,
                        "country": country
                    });
                }
            }>
                Submit
            </Button>
        </div>



    );
}

export default ShippingForm;