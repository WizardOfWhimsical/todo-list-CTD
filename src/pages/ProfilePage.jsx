import { useEffect, useState } from 'react';
import { get } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import BarChart from '../utils/BarChart';
import ErrorDisplay from '../shared/ErrorDisplay';

export default function ProfilePage() {
  const [todoStats, setToDoStats] = useState({});

  const [error, setError] = useState('');
  const [isloading, setIsLoading] = useState(false);

  const { email, token } = useAuth();
  const { total, active, completed } = todoStats;

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

        if (!firstPost) {
          setError('');

          const total = data.length;
          const completed = data.filter((todo) => todo.isCompleted).length;
          const active = total - completed;

          setIsLoading(false);
          setToDoStats({ total, completed, active });
        }
      } catch (error) {
        setIsLoading(false);
        setError(`Error loading statistics: ${error.message}`);
      }
    }
    fetchTodos();
    return () => {
      console.log('one render ran clean up');
      firstPost = true;
    };
  }, [token]);

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
