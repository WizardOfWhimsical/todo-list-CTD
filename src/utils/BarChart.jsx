import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

//https://www.geeksforgeeks.org/reactjs/how-to-implement-barchart-in-reactjs/
export default function BarChart({ total, active, completed, name }) {
  const data = {
    labels: ['Total', 'Active', 'Completed'],
    datasets: [
      {
        label: 'To-Dos',
        data: [total, active, completed],
        backgroundColor: ['#50b432', '#058DC7', '#ED561B'],
        borderColor: ['#50b432', '#058DC7', '#ED561B'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: { size: 15 },
        },
      },
      title: {
        display: true,
        text: `${name}'s To-Do Stats`,
        font: { size: 18 },
      },
    },
  };

  return (
    <div style={{ maxWidth: '650px', height: '400px' }}>
      <Bar data={data} options={options} />
    </div>
  );
}
