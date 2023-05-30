import { useEffect, useState, useCallback } from "react";
import { ParamsSection } from "./sections/ParamsSection"
import { SelectionSection } from "./sections/SelectionSection";
import { FormatSection } from "./sections/FormatSection";
import { useQuery } from 'react-query';
import { Spinner } from 'react-bootstrap';
import { downloadZip, downloadCSV, formatDate } from "./formatDownloadUtils";
import { getAllCountries, getAllRegions, getAllBasicStationMetadata, getDownloadData } from '../../services/GHCNMService';
import { DataTypes, FormatFields, ParamsFields, RawRegions, StationMetadata } from "../../common/download.interface";
import { ReactQueryConfig, QueryKeys, monthType } from "../../common/constants";

export default function DownloadPage() {
  const [downloadError, setDownloadError] = useState<string | undefined>();
  const [doDownload, setDoDownload] = useState<boolean>(false);

  const [params, setParams] = useState<ParamsFields>({
    years: [],
    months: [],
    countries: [],
    regions: [],
    coordinates: [{
      latitude: { single: null, start: null, end: null },   //set initial value for coordinates so users can see the coordinate input box
      longitude: { single: null, start: null, end: null },
      elevation: { single: null, start: null, end: null },
    }],
    stations: [],
    dataTypes: []
  });

  const [format, setFormat] = useState<FormatFields>({
    monthlyDataViewFormat: 'condensed',
    combineDates: 'separate',
    dateFormat: '',
    files: 'concat',
    insertMetadata: false,
  });

  const { data: dataCountries, error: errorCountries, isLoading: isLoadingCountries } = useQuery({
    queryKey: [QueryKeys.COUNTRIES],
    ...ReactQueryConfig,
    queryFn: () => getAllCountries()
  });

  const { data: dataStations, error: errorStations, isLoading: isLoadingStations } = useQuery({
    queryKey: [QueryKeys.BASIC_STATIONS],
    ...ReactQueryConfig,
    queryFn: () => getAllBasicStationMetadata()
  });

  const { data: dataRegions, error: errorRegions, isLoading: isLoadingRegions } = useQuery({
    queryKey: [QueryKeys.REGIONS],
    ...ReactQueryConfig,
    queryFn: () => getAllRegions()
  });

  const { data: downloadData, error: errorDownloadData, refetch: refetchDownloadData, isFetching: isFetchingDownloadData } = useQuery({
    queryKey: [QueryKeys.DOWNLOAD],
    ...ReactQueryConfig,
    enabled: doDownload,
    queryFn: () => getDownloadData(params)
  });

  // Date is showing up weird right now but otherwise working
  // only called when data is to be downloaded to reduce processing
  // data is entered in arrays of JSON objects (key: column heading, value: value)
  // if byStation is selected, returns an array of arrays of JSON objects - otherwise returns a single array of JSON objects <-- outdated
  const formatData = useCallback((data: any[], type: DataTypes, stationMetadata?: StationMetadata[], forPreview: boolean = false): any[] => {
    if (type === 'stations') {    // no modificcations made to station metadata
      return data;
    };

    const formattedData = [];
    var formattedStation: any = {};
    var currStationCode: string = '';
    const stationBreaks: number[] = [];    // keep track of whenever we move on to a new station

    for (let row = 0; row < data.length; row++) {

      if (currStationCode !== data[row]['station']) {
        currStationCode = data[row]['station'];
        // the station metadata is only updated if the station is different to reduce computation
        formattedStation = format.insertMetadata && stationMetadata ? stationMetadata.find((stationData: StationMetadata) => currStationCode === stationData.station) : { station: currStationCode }; // eslint-disable-line no-loop-func
        stationBreaks.push(row);
      };

      // inserting station metadata is the same for all data types (excl. stations)
      if (type === 'prcp' || type === 'anom' || type === 'anom_pcnt') {
        const { station, year, ...monthlyData } = data[row];
        const monthDates = format.combineDates === 'combine' && format.dateFormat.length > 0 ? Object.keys(monthlyData).map((month: string) => formatDate(year, month as monthType, format.dateFormat)) : [];

        // make sure spread format still works when no date format set
        if (format.monthlyDataViewFormat === 'spread') {   // condensed form is default
          if (monthDates.length > 0) {  // if dates are formatted
            for (let m = 0; m < monthDates.length; m++) {
              formattedData.push({
                ...formattedStation,
                date: monthDates[m],
                reading: Object.values(monthlyData)[m]
              });
            };
          } else {  // if dates aren't formatted
            for (let m = 0; m < Object.keys(monthlyData).length; m++) {
              formattedData.push({
                ...formattedStation,
                year,
                month: Object.keys(monthlyData)[m],
                reading: Object.values(monthlyData)[m]
              });
            };
          };
        } else {
          formattedData.push({
            ...formattedStation,
            year,
            ...monthlyData
          });
        };
      } else {    // for cycles data
        // combining dates not applicable for cycles data, as there is no year field
        // cycles data must be in spread format, so only insert metadata to be concerned about

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { station, month, mean, standard_deviation, percentiles } = data[row];
        formattedData.push({
          ...formattedStation,
          month,
          mean,
          "stddev": standard_deviation,
          "prcntl_2.5": percentiles["2.5"],
          "prcntl_17": percentiles["17"],
          "prcntl_50": percentiles["50"],
          "prcntl_83": percentiles["83"],
          "prcntl_97.5": percentiles["97.5"]
        });
      };
    };

    // separating stations is the same for all data types (excl. stations)
    // data for all stations is concatenated together by default
    if (format.files === 'byStation' && forPreview === false) {
      const dataByStation: any[] = [];

      // multiply up the station breaks to account for the spread format, but only for monthly data
      const updatedStationBreaks: number[] = ((format.monthlyDataViewFormat === 'spread') && (type !== 'cycles')) ?
        stationBreaks.reduce((accumulator, current: number) => accumulator.concat(current * params.months.length), [] as number[]) : stationBreaks;

      for (let s = 0; s < updatedStationBreaks.length - 1; s++) {
        dataByStation.push(formattedData.slice(updatedStationBreaks[s], updatedStationBreaks[s + 1]));
      };
      dataByStation.push(formattedData.slice(updatedStationBreaks[updatedStationBreaks.length - 1], formattedData.length - 1));    // pushing last unaccounted for elements
      return dataByStation;
    } else {
      return formattedData;
    };
  }, [format, params]);

  useEffect(() => {
    if (doDownload && errorDownloadData && (!isFetchingDownloadData)) {
      setDownloadError('Download failed');
      setDoDownload(false);
    };
    if (doDownload && downloadData && (!isFetchingDownloadData)) {
      console.log(downloadData);
      Object.keys(downloadData).forEach((downloadType: string) => {
        if (downloadData[downloadType].length > 0) {
          const formattedDownload: any[] = formatData(downloadData[downloadType], downloadType as DataTypes, downloadData['stations']);
          if ((downloadType !== 'stations') && (format.files === 'byStation')) {
            const stationNames = formattedDownload.map((stationData: any[]) => (stationData[stationData.length - 1])['station']);
            downloadZip(formattedDownload, downloadType, stationNames);
          } else {
            console.log(isFetchingDownloadData, params, format, downloadType, formattedDownload);
            // downloadCSV(formattedDownload, downloadType);
          };
        }
      });
      setDoDownload(false);
    };
  }, [params, format, downloadData, errorDownloadData, isFetchingDownloadData, doDownload, formatData]);

  return (
    <div className="data-content"
      style={{ height: !(dataCountries && dataStations && dataRegions) ? '100vh' : '100%' }} >
      <div className='title'>
        Historical Precipitation Data Explorer
      </div>
      <hr style={{ width: "100%" }} />
      <div className="d-flex flex-row align-items-start">
        <div className='params-format-wrapper'><>
          {(errorCountries || errorStations || errorRegions) && (
            <div className='params-section heading-1'>
              There was an error loading the data.
            </div>
          )}
          {(isLoadingCountries || isLoadingStations || isLoadingRegions) && (
            <div className='params-section heading-1'>
              <Spinner animation="border" className='me-4' /> Loading...
            </div>
          )}
          {(dataCountries && dataStations && dataRegions) && (
            <>
              <ParamsSection
                params={params}
                onParamsChanged={(newParams: ParamsFields) => setParams(newParams)}
                countries={dataCountries}
                stations={dataStations}
                regions={dataRegions.map((region: RawRegions) => region.region)}
              />
              <FormatSection
                format={format}
                onFormatChanged={(newFormat: FormatFields) => setFormat(newFormat)}
                params={params}
                formatData={formatData} />
            </>
          )}
        </></div>
        <SelectionSection params={params} format={format} />
      </div>
      {(dataCountries && dataStations && dataRegions) && (
        <div className='d-flex flex-row justify-content-center pt-3 pb-5' style={{ width: '65%' }} >
          <div className='column'>
            <button className={`big-button ${isFetchingDownloadData === true ? 'disabled' : ''}`} style={{ width: '250px' }}
              onClick={(e) => {
                if (params.dataTypes.length === 0) {
                  setDownloadError('Please select data type');
                } else {
                  setDownloadError(undefined);
                  setDoDownload(true);
                  refetchDownloadData();
                }
              }}>
              <div className='button-text'>
                DOWNLOAD
              </div>
              {doDownload === true ?
                <Spinner animation="border" className="heading-1 text-white" /> : <i className='material-icons'>download_outlined</i>
              }
            </button>
            {downloadError && (
              <div className="text-field-error pt-1 text-center">{downloadError}</div>
            )}
          </div>
          <button className='big-button ms-3 disabled' style={{ width: '250px' }}>
            <div className='button-text'>
              VISUALIZE
            </div>
            <i className='material-icons'>play_arrow</i>
          </button>
        </div>
      )}
    </div>
  )
}