import { useEffect, useState } from 'react';
import { get } from '../utils/api';
import { useAuth } from '../context/AuthContext';

import Button from 'react-bootstrap/Button';

export default function ProfilePage() {
  const [total, setTotal] = useState(0);
  const [complete, setComplete] = useState(0);
  const [active, setActive] = useState(0);
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
        const data = await get(`tasks`, options);
        console.log(data);
        if (!firstPost) {
          // put success here
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchTodos();

    return () => {
      console.log('one render ran clean up');
      firstPost = true;
    };
  }, []);

  return (
    <>
      <h1>helloWorld</h1>
    </>
  );
}
