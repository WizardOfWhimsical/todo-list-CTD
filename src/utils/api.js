const baseUrl = import.meta.env.VITE_BASE_URL;

export default async function post(endPoint, email, password) {
  console.log('working right!');
  return await fetch(`${baseUrl}/${endPoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      email,
      password,
    }),
  });
}
