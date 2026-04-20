import React from 'react';
import './Dashboard.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales ($)',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        borderColor: '#d4af37',
        backgroundColor: 'rgba(212, 175, 55, 0.2)',
        fill: true,
        tension: 0.4, 
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h1>Store Overview</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p>1,250</p>
        </div>
        <div className="stat-card">
          <h3>Customers</h3>
          <p>850</p>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p>$45,200</p>
        </div>
      </div>

      <div className="chart-section">
        <h3>Monthly Sales Performance</h3>
        <Line data={data} />
      </div>
    </div>
  );
};

export default Dashboard;