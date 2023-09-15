import React from 'react'
import './SalesChart.css'

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
            text: 'Chart.js Bar Chart',
        },
    },
};

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data:[1,2,34,5,6,4,1,2],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
    ],
};

function SalesChart() {
    return (
        <div className='my-chart'>
            <div className='bar'> <Bar options={options} data={data} /></div>

        </div>
    )
}

export default SalesChart