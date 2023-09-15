import client from "./client";

function verifyVendor(vendorId) {
    return  client
        .get(`/vendor/verify/${vendorId}`)
        .then((res) =>  res.data);
}

export { verifyVendor };