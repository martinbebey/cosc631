import { commerce } from '../lib/commerce';
import { useEffect, useState } from 'react';

function Orders() {
    const [customerID, setCustomerID] = useState("");

    useEffect(() => {
        commerce.customer.about().then((customer) => {
            console.log(customer);
            setCustomerID(customer.id);
        });
    });

    useEffect(() => {
        commerce.customer.getOrders(customerID).then((orders) => {
            console.log(orders);;
        });
    });

    return (
        <div>orders page</div>
    );
}

export default Orders;