const baseUrl = import.meta.env.VITE_BASE_URL;

function post(endPoint) {
  fetch(endPoint, { method: 'POST' });
}
