import React, {useEffect, useState} from 'react'
import './saleschart.scss'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {getSalesByVendor} from "../../api/productSales";
import {useAuth} from "../../context/AuthContext";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import CircularDeterminate from "../CircularDeterminate";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' , 'September', 'October', 'November', 'December'];


export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' ,
        },
        title: {
            display: true,
            text: 'Monthly Sales Bar Chart',
        },
    },
};


function SalesChart() {

    const [data, setData] = useState([]);
    const [year, setYear] = useState(2023);
    const [loading, setLoading] = useState(true);
    const { vendorId } = useAuth()
    const [isEmpty , setEmpty ] = useState(false)

    const chartdata = {
        labels,
        datasets: [
            {
                label: 'Product Sales Quantity',
                data:data,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };



    useEffect(() => {
        getSalesByVendor(vendorId, year)
            .then((responseData) => {
                setData(responseData.salesByMonths);
                setLoading(false);
                console.log("contorl" + isEmptyArray(responseData.salesByMonths) )
                if(isEmptyArray(responseData.salesByMonths)) setEmpty(true)
                else setEmpty(false)
            })
            .catch((error) => {
                setLoading(false);
            });
    }, [year]);

    return (

        <>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Select Year</InputLabel>
            <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={year}
                onChange={(e) => {
                    setYear(e.target.value)
                    setLoading(true)
                }}
                label="Select Year"
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={2020}>2020</MenuItem>
                <MenuItem value={2021}>2021</MenuItem>
                <MenuItem value={2022}>2022</MenuItem>
                <MenuItem value={2023}>2023</MenuItem>
            </Select>
            </FormControl>
            <div className='my-chart'>

                {loading ? ( <CircularDeterminate />
                ) : (
                        <>{ isEmpty ? (<p>No sales were made this year</p>) : <div className='bar'> <Bar options={options} data={chartdata} /></div> }</>







                )}

            </div>
        </>

    )
}

function isEmptyArray(array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] !== 0) {
            return false;
        }
    }
    return true;
}

export default SalesChart