import { CountryInfo, ParamsFields, RawRegions, StationMetadata, StationMetadataBasic } from '../common/download.interface';
import { getHeaders } from '../common/constants';
import axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:9999/api/ghcnmv2/' : 'http://0.0.0.0:9999/api/ghcnmv2/';

export async function getAllStationMetadata(): Promise<StationMetadata[]> {
  return axios.get(`${BASE_URL}station`, {
    headers: getHeaders
  }).then(res => res.data);
}

export async function getAllBasicStationMetadata(): Promise<StationMetadataBasic[]> {
  return axios.get(`${BASE_URL}basic/station`, {
    headers: getHeaders
  }).then(res => res.data);
}

export async function getAllCountries(): Promise<CountryInfo[]> {
  return axios.get(`${BASE_URL}countries`, {
    headers: getHeaders
  }).then(res => res.data);
}

export async function getAllRegions(): Promise<RawRegions[]> {
  return axios.get(`${BASE_URL}regions`, {
    headers: getHeaders
  }).then(res => res.data);
}

export async function getDownloadData(byStation: boolean, dataParams: ParamsFields): Promise<any> {
  return axios.get(`${BASE_URL}download`, {
    headers: getHeaders,
    params: {
      byStation,
      ...dataParams
    }
  }).then(res => res.data);
}