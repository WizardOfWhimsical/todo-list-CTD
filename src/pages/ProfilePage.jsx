import { useEffect, useState } from 'react';
import { get } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import BarChart from '../utils/BarChart';
import ErrorDisplay from '../shared/ErrorDisplay';

import Button from 'react-bootstrap/Button';

export default function ProfilePage() {
  const [todoStats, setToDoStats] = useState({});

  const [error, setError] = useState('');
  const [isloading, setIsLoading] = useState(false);

  const { email, token } = useAuth();

  useEffect(() => {
    if (!token) return;
    let firstPost = false;

    async function fetchTodos() {
      const options = {
        headers: { 'X-CSRF-TOKEN': token },
      };
      try {
        setIsLoading(true);
        const data = await get(`tasks`, options);
        // console.log('data from a basi get helper\n', data);
        // console.log('name from useAuth email\n', email);
        if (!firstPost) {
          // put success here
          setError('');
          console.log(data);
          const total = data.length;
          const completed = data.filter((todo) => todo.isCompleted).length;
          const active = total - completed;
          console.log(total);
          // console.log(completed);
          // console.log(active);
          setIsLoading(false);
          setToDoStats({ total, completed, active });
        }
      } catch (error) {
        setIsLoading(false);
        setError(`Error loading statistics: ${error.message}`);
        console.log(error);
      }
    }

    fetchTodos();

    return () => {
      console.log('one render ran clean up');
      firstPost = true;
    };
  }, [token]);

  const { total, active, completed } = todoStats;
  console.log('should be numbers\n', todoStats);

  return (
    <>
      {error && <ErrorDisplay error={error} onClick={() => setError('')} />}
      {isloading ? (
        <h1> One moment while we calculate...</h1>
      ) : (
        <BarChart
          total={total}
          active={active}
          completed={completed}
          name={email}
        />
      )}
    </>
  );
}
