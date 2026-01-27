import { useEffect } from 'react';
import { get } from '../utils/api';

import Button from 'react-bootstrap/Button';

export default function ProfilePage() {
  useEffect(() => {
    async function fetchData() {
      const data = await get(`tasks`);
      console.log(data);
    }
    fetchData();
  }, []);

  return (
    <>
      <h1>helloWorld</h1>
    </>
  );
}
