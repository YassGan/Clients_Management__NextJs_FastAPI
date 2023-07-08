

// components/ClientsChart.js

'use client'

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ClientsChart = ({ clients }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [],
      },
      options: {},
    });

    updateChart(clients);

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [clients]);

  const updateChart = (clients) => {

    const RégionCounts = {};
    clients.forEach((client) => {
      if (RégionCounts[client.Région]) {
        RégionCounts[client.Région] += 1;
      } else {
        RégionCounts[client.Région] = 1;
      }
    });

    const Régions = Object.keys(RégionCounts);
    const clientCounts = Object.values(RégionCounts);

    chartInstanceRef.current.data.labels = Régions;
    chartInstanceRef.current.data.datasets = [
      {
        data: clientCounts,
        backgroundColor: generateBackgroundColors(Régions.length),
        borderWidth: 1,
        barPercentage: 0.8,
      },
    ];
    chartInstanceRef.current.options = {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            precision: 0,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    };

    chartInstanceRef.current.update();
  };

  const generateBackgroundColors = (length) => {

    const colors = [];
    for (let i = 0; i < length; i++) {
      const color = `rgba(${getRandomValue(0, 255)}, ${getRandomValue(0, 255)}, ${getRandomValue(0, 255)}, 0.6)`;
      colors.push(color);
    }
    return colors;
  };

  const getRandomValue = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  return (
    <div className="chart-container">
      <h3>Clients per region</h3>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default ClientsChart;
