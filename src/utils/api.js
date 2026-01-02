const baseUrl = import.meta.env.VITE_BASE_URL;
const DEFAULT_OPTIONS = {
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  method: 'GET',
};

async function fetchErrorHandling(endPoint, options) {
  try {
    const response = await fetch(`${baseUrl}/${endPoint}`, {
      ...DEFAULT_OPTIONS,
      ...options,
      headers: {
        ...DEFAULT_OPTIONS.headers,
        ...options.headers,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      error.status = response.status;
      throw error;
    }
    return response.json();
  } catch (error) {
    console.log('Fetch Error Handling:', error);
  }
}
export async function post(endPoint, options) {
  try {
    return await fetchErrorHandling(`${endPoint}`, {
      ...options,
      method: 'POST',
      body: JSON.stringify(options.body),
    });
  } catch (e) {
    console.log('post function catch\n\t', e);
  }
}
export async function patch(endPoint, options) {
  try {
    return await fetchErrorHandling(`${endPoint}`, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(options.body),
    });
  } catch (e) {
    console.log('patch function catch\n\t', e);
  }
}

export async function get(endPoint, options) {
  try {
    return await fetchErrorHandling(`${endPoint}`, options);
  } catch (e) {
    console.log('get function catch\n\t', e);
  }
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
