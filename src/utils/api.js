const baseUrl = import.meta.env.VITE_BASE_URL;
const DEFAULT_OPTIONS = {
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
};
export async function post(endPoint, options) {
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

export async function get(endPoint, options) {
  return await fetch(`${baseUrl}/${endPoint}`, {
    ...DEFAULT_OPTIONS,
    ...options,
    method: 'GET',
    headers: {
      ...DEFAULT_OPTIONS.headers,
      ...options.headers,
    },
    body: JSON.stringify(options.body),
  });
}

// const baseUrl = 'https://ctd-learns-node-l42tx.ondigitalocean.app';

// const BASE_OPTIONS = {
//   credentials: 'include',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   method: 'GET',
// };

// /**
//  *
//  * @param {string} endpoint
//  * @param {RequestInit} [options]
//  */
// const fetcher = async (endpoint, options) => {
//   if (!endpoint) {
//     throw new Error('[fetcher] Endpoint is required');
//   }

//   try {
//     const res = await fetch(new URL(endpoint, baseUrl), {
//       ...BASE_OPTIONS,
//       ...options,
//       headers: {
//         ...BASE_OPTIONS.headers,
//         ...options.headers,
//       },
//     });
//     if (!res.ok) {
//       /**
//        * @type {Error & {info: any; status: number}}
//        */
//       const error = new Error(
//         '[fetcher] An error occurred while fetching the data.'
//       );
//       // Attach extra info to the error object.
//       error.info = await res.json();
//       error.status = res.status;
//       throw error;
//     }
//     return res.json();
//   } catch (error) {
//     console.error('[fetcher] Fetch JSON Error:', error);
//   }
// };

// /**
//  * @param {string} url
//  * @param {RequestInit} options
//  */
// export const get = (url, options) => {
//   return fetcher(url, options);
// };

// /**
//  * @param {string} url
//  * @param {RequestInit} options
//  */
// export const post = (url, options) => {
//   return fetcher(url, {
//     ...options,
//     body: JSON.stringify(options.body),
//     method: 'POST',
//   });
// };
