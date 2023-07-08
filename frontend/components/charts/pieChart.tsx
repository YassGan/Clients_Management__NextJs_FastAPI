'use client'

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const GenrePieChart = ({ clients, width, height }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const GenreCounts = {};
    clients.forEach((client) => {
      if (GenreCounts[client.Genre]) {
        GenreCounts[client.Genre] += 1;
      } else {
        GenreCounts[client.Genre] = 1;
      }
    });

    const Genres = Object.keys(GenreCounts);
    const clientCounts = Object.values(GenreCounts);

    const chartData = {
      labels: Genres,
      datasets: [{
        data: clientCounts,
        backgroundColor: generateBackgroundColors(Genres.length),
      }],
    };

    chartInstanceRef.current = new Chart(ctx, {
      type: 'pie',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true,
          position: 'bottom',
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [clients]);

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
    <div>
      <p className='pb-2'> Clients per Gender </p>
    <div className="pie-chart-container">
      <canvas ref={chartRef} width={width} height={height}></canvas>
    </div>
    </div>
  );
};

export default GenrePieChart;
