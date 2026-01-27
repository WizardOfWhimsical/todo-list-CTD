import { useEffect } from 'react';
import { get } from '../utils/api';

export default function ProfilePage() {
  useEffect(() => {
    async function fetchData() {
      const data = await get(`tasks`);
      console.log(data);
    }
    fetchData();
  }, []);

  return null;
}
