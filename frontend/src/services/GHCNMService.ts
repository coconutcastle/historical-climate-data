import { CountryInfo, ParamsFields, RawRegions, StationMetadata, StationMetadataBasic } from '../common/download.interface';
import { getHeaders } from '../common/constants';
import axios from 'axios';

export async function getAllStationMetadata(): Promise<StationMetadata[]> {
  return axios.get('http://localhost:9999/api/ghcnmv2/station', {
    headers: getHeaders
  }).then(res => res.data);
}

export async function getAllBasicStationMetadata(): Promise<StationMetadataBasic[]> {
  return axios.get('http://localhost:9999/api/ghcnmv2/basic/station', {
    headers: getHeaders
  }).then(res => res.data);
}

export async function getAllCountries(): Promise<CountryInfo[]> {
  return axios.get('http://localhost:9999/api/ghcnmv2/countries', {
    headers: getHeaders
  }).then(res => res.data);
}

export async function getAllRegions(): Promise<RawRegions[]> {
  return axios.get('http://localhost:9999/api/ghcnmv2/regions', {
    headers: getHeaders
  }).then(res => res.data);
}

export async function getDownloadData(byStation: boolean, dataParams: ParamsFields): Promise<any> {
  return axios.get('http://localhost:9999/api/ghcnmv2/download', {
    headers: getHeaders,
    params: {
      byStation,
      ...dataParams
    }
  }).then(res => res.data);
}