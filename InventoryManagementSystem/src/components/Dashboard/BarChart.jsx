import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, scales } from 'chart.js';
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const BarChart = ({data}) => {
    const chardata={
        lables: data.map(item => item.Product_Name),
        datasets:[
            {
                label: 'Stock Quantity',
                data: data.map(item => item.Stock_Qty),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales:{
            y:{
                beginAtZero: true,
            },
        },
    };

    return <Bar data={chardata} options={options}/>;
}

export default BarChart