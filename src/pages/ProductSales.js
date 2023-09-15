import React, {useEffect, useState} from "react";
import {DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbar} from "@mui/x-data-grid";
import {getProductSales} from "../api/productSales";
import {Stack, TextField, Typography} from "@mui/material";
import {useAuth} from "../context/AuthContext";
import CircularDeterminate from "../components/CircularDeterminate";

const ProductSales = () => {

    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEmpty , setEmpty ] = useState(false)

    const { vendorId }= useAuth()

    useEffect(() => {
        getProductSales(vendorId)
            .then((data) => {
                if(data.data.length === 0) {
                    setEmpty(true)
                }
                setSalesData(data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            });
    }, []);

    const columns = [
        {field: 'productNumber', headerName: 'Product Code', width: 250, align: 'left'},
        {field: 'productName', headerName: 'Product Name', width: 250, align: 'left'},
        {field: 'productColor', headerName: 'Product Color', width: 250, align: 'left'},
        {field: 'totalSales', headerName: 'Total Sales', width: 250, align: 'left'},
    ];

    return <div>
        {loading ? (
            <CircularDeterminate />
        ) : (
            <div>
                {
                    isEmpty ? <p>No data provided</p> : <DataGrid
                        sx={{
                            border: 0,
                            margin: 'auto',
                        }}
                        initialState={{
                            pagination: {paginationModel: {pageSize: 10}},
                        }}
                        pageSizeOptions={[5, 10, 25, 50]}
                        rows={salesData.data} columns={columns}
                        getRowId={(row) => row.productNumber}
                        slots={{toolbar: GridToolbar}}

                    />
                }

            </div>
        )}

    </div>;
};

function Toolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport/>
        </GridToolbarContainer>
    );
}

export default ProductSales;