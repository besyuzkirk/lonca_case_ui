import client from "./client";

function getProductSales(vendorId) {
    return  client
        .get(`/order/salesByVendor/${vendorId}`)
        .then((res) =>  res.data);
}

function getSalesByVendor(vendorId, year) {
    return client
        .get(`/order/monthlyRevenues`, {
            params: {
                vendorId: vendorId,
                year: year,
            },
        })
        .then((res) => res.data);
}

export { getProductSales , getSalesByVendor};
