// import React from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
// ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

// const BarChart = ({ data, height }) => {
//   // Generate random colors for each bar
//   const randomColor = () => {
//     const r = Math.floor(Math.random() * 256);
//     const g = Math.floor(Math.random() * 256);
//     const b = Math.floor(Math.random() * 256);
//     return `rgba(${r}, ${g}, ${b}, 0.6)`;
//   };

//   const chartData = {
//     labels: data.map(item => item.Product_Name),
//     datasets: [
//       {
//         label: 'Stock Quantity',
//         data: data.map(item => item.Stock_Qty),
//         backgroundColor: data.map(() => randomColor()), // Generate different colors
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//       },
//     ]
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: true,
//         position: 'top', // Adjust as needed
//         labels: {
//           color: 'rgba(0, 0, 0, 0.6)', // Legend color
//           font: {
//             size: 12,
//           },
//         },
//       },
//     },
//     scales: {
//       x: {
//         grid: {
//           display: false,
//         },
//         ticks: {
//           color: 'rgba(0, 0, 0, 0.6)', // X axis labels color
//           font: {
//             size: 12,
//           },
//         },
//       },
//       y: {
//         beginAtZero: true,
//         ticks: {
//           precision: 0,
//           color: 'rgba(0, 0, 0, 0.6)', // Y axis labels color
//           font: {
//             size: 12,
//           },
//         },
//       },
//     },
//     layout: {
//       padding: {
//         top: 20,
//         bottom: 20,
//         left: 20,
//         right: 20,
//       },
//     },
//   };

//   return <Bar data={chartData} options={options} height={height} />;
// }

// export default BarChart;
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const BarChart = ({ data, height }) => {
  // Generate random colors for each bar
  const randomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 0.6)`;
  };

  const chartData = {
    labels: data.map(item => item.Product_Name),
    datasets: [
      {
        label: 'Stock Quantity',
        data: data.map(item => item.Stock_Qty),
        backgroundColor: data.map(() => randomColor()), // Generate different colors
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top', // Adjust as needed
        labels: {
          color: 'rgba(0, 0, 0, 0.6)', // Legend color
          font: {
            size: 20,
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgba(0, 0, 0, 0.6)', // X axis labels color
          font: {
            size: 20,
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
          color: 'rgba(0, 0, 0, 0.6)', // Y axis labels color
          font: {
            size: 20,
          },
        },
      },
    },
    layout: {
      padding: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
      },
    },
  };

  return <Bar data={chartData} options={options} height={height} />;
}

export default BarChart;
