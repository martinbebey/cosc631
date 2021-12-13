import { commerce } from '../lib/commerce';
import { useEffect, useState } from 'react';
import { Card, Grid } from "@material-ui/core";

function Orders() {
    const [customerID, setCustomerID] = useState("");
    const [orders, setOrders] = useState([]);
    const [customerEmail, setCustomerEmail] = useState("");

    useEffect(() => {
        commerce.customer.about().then((customer) => {
            console.log(customer);
            setCustomerID(customer.id);
        });
    }, []);

    useEffect(() => {
        commerce.customer.getOrders(customerID).then((orders) => {
            console.log(orders);
            setOrders(orders.data);
            setCustomerEmail(orders.data[0].customer.email);
        });
    }, [customerID]);

    return (
        <div>
            {!customerID && <h5>Loading...</h5>}
            
            {orders && <div>
                <Grid item>
                    {customerEmail && <h5> Welcome! {customerEmail} </h5>}
                </Grid>

                <div>
                    {
                        orders.map((order) => {
                            return <OrderItem order={order} />
                        })
                    }
                </div>
            </div>}
        </div>
    );
}

function OrderItem({ order }) {
    var date = new Date(0);

    return (
        <Card style={{ marginBottom: "20px" }}>
            <Grid container direction="column" align="left">
                <Grid style={{ backgroundColor: "LightBlue" }}>
                    <Grid item style={{ marginLeft: "5px" }}>
                        {<b>Order placed: {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(date.setUTCSeconds(order.created))}</b>}
                    </Grid>

                    <Grid item style={{ marginLeft: "5px" }}>
                        {<div style={{ color: "gray" }}>{order.order_value.formatted_with_code}</div>}
                    </Grid>
                </Grid>

                <Grid item container>
                    {
                        order.order.line_items.map((product) => {
                            return <ProductItem product={product} />
                        })
                    }
                </Grid>
            </Grid>
        </Card>
    );
}

function ProductItem({ product }) {
    return (
        <Grid item container direction="row" align="left" style={{ marginLeft: "5px" }}>
            <Grid item xs={8} sm={8} md={8} lg={8}>
                {<div>
                    <font size="1">{product.product_name}</font>
                </div>}
            </Grid>

            <Grid item xs={2} sm={2} md={2} lg={2}>
                {<div>
                    <font size="1">{product.quantity}</font>
                </div>}
            </Grid>

            <Grid item xs={2} sm={2} md={2} lg={2}>
                {<div>
                    <font size="1">{product.line_total.formatted_with_code}</font>
                </div>}
            </Grid>
        </Grid>
    );
}

export default Orders;
export { OrderItem };
export { ProductItem };