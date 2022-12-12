import fetch from 'isomorphic-fetch';
import { CountryInfo, RawRegions, StationMetadata } from './common/download.interface';

const rejectOrJson = (res: Response) => {
  if (!res.ok) {
    return Promise.reject(res.statusText);
  } else {
    return res.json();
  };
}

export async function getAllStationMetadata(): Promise<StationMetadata[]> {
  return fetch('http://localhost:9999/api/ghcnmv2/station', {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET'
    }
  }).then(rejectOrJson)
}

export async function getAllCountries(): Promise<CountryInfo[]> {
  return fetch('http://localhost:9999/api/ghcnmv2/countries', {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET'
    }
  }).then(rejectOrJson)
}

export async function getAllRegions(): Promise<RawRegions[]> {
  return fetch('http://localhost:9999/api/ghcnmv2/regions', {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET'
    }
  }).then(rejectOrJson)
}
