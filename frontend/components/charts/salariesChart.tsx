'use client'

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const SalariesChart = ({ clients }) => {
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
    const SalaireRanges = ['400-700', '701-1200', '1201-1500'];
    const SalaireCounts = [0, 0, 0];

    clients.forEach((client) => {
      if (client.Salaire >= 400 && client.Salaire <= 700) {
        SalaireCounts[0] += 1;
      } else if (client.Salaire >= 701 && client.Salaire <= 1200) {
        SalaireCounts[1] += 1;
      } else if (client.Salaire >= 1201 ) {
        SalaireCounts[2] += 1;
      }
    });

    chartInstanceRef.current.data.labels = SalaireRanges;
    chartInstanceRef.current.data.datasets = [
      {
        data: SalaireCounts,
        backgroundColor: generateBackgroundColors(SalaireRanges.length),
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
      <h3>Salary Ranges</h3>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default SalariesChart;
