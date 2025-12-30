const baseUrl = import.meta.env.VITE_BASE_URL;
const DEFAULT_OPTIONS = {
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
};
export default async function post(endPoint, options) {
  console.log('working right!');
  return await fetch(`${baseUrl}/${endPoint}`, {
    ...DEFAULT_OPTIONS,
    ...options,
    method: 'POST',
    headers: {
      ...DEFAULT_OPTIONS.headers,
      ...options.headers,
    },
    body: JSON.stringify(options.body),
  });
}
