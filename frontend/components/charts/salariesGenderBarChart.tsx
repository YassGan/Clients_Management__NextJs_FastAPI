'use client'

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const SalaireGenreBarChart = ({ clients }) => {
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
    const GenreSalaries = {};
    clients.forEach((client) => {
      if (GenreSalaries[client.Genre]) {
        GenreSalaries[client.Genre].push(client.Salaire);
      } else {
        GenreSalaries[client.Genre] = [client.Salaire];
      }
    });

    const Genres = Object.keys(GenreSalaries);
    const averageSalaries = Genres.map((Genre) => {
      const salaries = GenreSalaries[Genre];
      const sum = salaries.reduce((total, Salaire) => total + Salaire, 0);
      return sum / salaries.length;
    });

    chartInstanceRef.current.data.labels = Genres;
    chartInstanceRef.current.data.datasets = [
      {
        label: 'Average Salaire',
        data: averageSalaries,
        backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(75, 192, 192, 0.6)'],
        borderWidth: 1,
      },
    ];
    chartInstanceRef.current.options = {
      responsive: true,
      scales: {
        y: {
          title: {
            display: true,
            text: 'Salaire',
          },
          beginAtZero: true,
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

  return (
    <div className="bar-chart-container">
      <h3 className='pb-3'>Salaries per Genre</h3>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default SalaireGenreBarChart;
