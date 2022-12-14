import fetch from 'isomorphic-fetch';
import { CountryInfo, ParamsFields, RawRegions, StationMetadata, StationMetadataBasic } from '../common/download.interface';
import { getHeaders } from '../common/constants';
import { encodeData } from '../common/helpers';
import axios from 'axios';

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

//assume all arrays actually hold relevant data
// export async function getDownloadData(byStation: boolean, dataParams: ParamsFields): Promise<any> {
//   return fetch('http://localhost:9999/api/ghcnmv2/download?' + encodeData({ byStation, ...dataParams }), {
//     headers: getHeaders
//   }).then(rejectOrJson)
// }
export async function getDownloadData(byStation: boolean, dataParams: ParamsFields): Promise<any> {
  return axios.get('http://localhost:9999/api/ghcnmv2/download', {
    headers: getHeaders,
    params: {
      byStation,
      ...dataParams
    }
  }).then(res => res.data);
}