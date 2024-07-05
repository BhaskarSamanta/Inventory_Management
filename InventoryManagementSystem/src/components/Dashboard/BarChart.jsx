import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell
} from 'recharts';

const BarChartComponent = ({ data, height }) => {
  // Define a set of colors for the bars
  const colors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
  ];

  // Custom tooltip for better display
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', padding: '10px', borderRadius: '5px', color: '#fff' }}>
          <p style={{ fontSize: '16px', margin: 0 }}>{`${payload[0].payload.Product_Name}`}</p>
          <p style={{ fontSize: '14px', margin: 0 }}>{`Stock Quantity: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  // Custom legend to show item names with their respective colors
  const renderCustomLegend = (props) => {
    const { payload } = props;
    return (
      <ul style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex', flexWrap: 'wrap' }}>
        {
          payload.map((entry, index) => (
            <li key={`item-${index}`} style={{ marginRight: 10, display: 'flex', alignItems: 'center' }}>
              <div style={{ width: 20, height: 20, backgroundColor: entry.color, marginRight: 5 }} />
              <span style={{ fontSize: '14px', color: '#666' }}>{entry.value}</span>
            </li>
          ))
        }
      </ul>
    );
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px' }}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Product_Name" tick={{ fill: '#666', fontSize: 14 }} />
          <YAxis tick={{ fill: '#666', fontSize: 14 }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend content={renderCustomLegend} />
          <Bar dataKey="Stock_Qty">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
