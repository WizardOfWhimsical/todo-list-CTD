import { useEffect } from 'react';
import { get } from '../utils/api';

import Button from 'react-bootstrap/Button';
// do i have a token proble. i see know reason why this page would take me back. is it requireAuth redirecting?
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
