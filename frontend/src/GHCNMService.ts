import fetch from 'isomorphic-fetch';

const rejectOrJson = (res: Response) => {
  if (!res.ok) {
    return Promise.reject(res.statusText);
  } else {
    return res.json();
  };
}

export async function getAllStationMetadata(): Promise<any> {
  return fetch('http://localhost:9999/api/ghcnmv2/station', {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET'
    }
  }).then(rejectOrJson)
}
