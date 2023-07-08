'use client'

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ÂgeSalaireScatterPlot = ({ clients }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const Âges = clients.map((client) => client.Âge);
    const salaries = clients.map((client) => client.Salaire);

    const scatterData = {
      labels: 'Âge vs Salaire',
      datasets: [
        {
          data: Âges.map((Âge, index) => ({ x: Âge, y: salaries[index] })),
          backgroundColor: generateBackgroundColors(Âges.length),
          pointRadius: 6,
          pointHoverRadius: 8,
        },
      ],
    };

    chartInstanceRef.current = new Chart(ctx, {
      type: 'scatter',
      data: scatterData,
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Âge',
            },
            min: 20, 
          },
          y: {
            title: {
              display: true,
              text: 'Salaire',
            },
            min: 0, 
          },
        },
        plugins: {
          legend: {
            display: false,
          },
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
    <div className="scatter-plot-container">
      <h3 className='pb-6'>Age and Salary</h3>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default ÂgeSalaireScatterPlot;
