import fetch from 'isomorphic-fetch';
import { CountryInfo, RawRegions, StationMetadata, StationMetadataBasic } from '../common/download.interface';
import { getHeaders } from '../common/constants';

const rejectOrJson = (res: Response) => {
  if (!res.ok) {
    return Promise.reject(res.statusText);
  } else {
    return res.json();
  };
}

export async function getAllStationMetadata(): Promise<StationMetadata[]> {
  return fetch('http://localhost:9999/api/ghcnmv2/station', {
    headers: getHeaders
  }).then(rejectOrJson)
}

export async function getAllBasicStationMetadata(): Promise<StationMetadataBasic[]> {
  return fetch('http://localhost:9999/api/ghcnmv2/basic/station', {
    headers: getHeaders
  }).then(rejectOrJson)
}

export async function getAllCountries(): Promise<CountryInfo[]> {
  return fetch('http://localhost:9999/api/ghcnmv2/countries', {
    headers: getHeaders
  }).then(rejectOrJson)
}

export async function getAllRegions(): Promise<RawRegions[]> {
  return fetch('http://localhost:9999/api/ghcnmv2/regions', {
    headers: getHeaders
  }).then(rejectOrJson)
}
