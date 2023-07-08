'use client'

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const DountChart = ({ clients, width, height }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: [],
        datasets: [],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%', 
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
          },
        },
      },
    });

    updateChart(clients);

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [clients, width, height]);

  const updateChart = (clients) => {
    const ÂgeRanges = {
      '20-35': 0,
      '36-50': 0,
      '51-72': 0,
      '72+': 0,
    };

    clients.forEach((client) => {
      if (client.Âge >= 20 && client.Âge <= 35) {
        ÂgeRanges['20-35'] += 1;
      } else if (client.Âge >= 36 && client.Âge <= 50) {
        ÂgeRanges['36-50'] += 1;
      } else if (client.Âge >= 51 && client.Âge <= 72) {
        ÂgeRanges['51-72'] += 1;
      } else if (client.Âge > 72) {
        ÂgeRanges['72+'] += 1;
      }
    });

    const ÂgeLabels = Object.keys(ÂgeRanges);
    const ÂgeCounts = Object.values(ÂgeRanges);

    chartInstanceRef.current.data.labels = ÂgeLabels;
    chartInstanceRef.current.data.datasets = [
      {
        data: ÂgeCounts,
        backgroundColor: generateBackgroundColors(ÂgeLabels.length),
      },
    ];

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

    <div>
      <p className='pb-4'> Age Distribution</p>
    <div className="chart-container">
      <canvas ref={chartRef} style={{ width, height }}></canvas>
    </div>
    </div>
  );
};

export default DountChart;
