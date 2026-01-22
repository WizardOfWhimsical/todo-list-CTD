const baseUrl = import.meta.env.VITE_BASE_URL;
const DEFAULT_OPTIONS = {
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  method: 'GET',
};

export async function fetchErrorHandling(endPoint, options) {
  try {
    const response = await fetch(`${baseUrl}/${endPoint}`, {
      ...DEFAULT_OPTIONS,
      ...options,
      headers: {
        ...DEFAULT_OPTIONS.headers,
        ...options.headers,
      },
    });

    if (!response.ok || response.status === 401) {
      const error = await response.json();
      error.status = response.status;
      throw error;
    }

    console.log('inside fetchErrorHandling:\n', response);
    return typeof response === 'string' ? response : response.json();
  } catch (error) {
    console.log('Fetch Error Handling:', error);
    throw error;
  }
}
export async function post(endPoint, options) {
  return await fetchErrorHandling(`${endPoint}`, {
    ...options,
    method: 'POST',
    body: JSON.stringify(options.body),
  });
}

export async function patch(endPoint, options) {
  return await fetchErrorHandling(`${endPoint}`, {
    ...options,
    method: 'PATCH',
    body: JSON.stringify(options.body),
  });
}

export async function get(endPoint, options) {
  return await fetchErrorHandling(endPoint, options);
}

export async function addTodo(todo, token) {
  return await fetchErrorHandling('tasks', {
    method: 'POST',
    headers: { 'X-CSRF-TOKEN': token },
    body: JSON.stringify({ title: todo.title, isCompleted: todo.isCompleted }),
  });
}
