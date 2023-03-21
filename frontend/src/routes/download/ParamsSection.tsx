import { useEffect } from 'react';
import { Form, Formik, FieldArray } from 'formik';
import { Range, DataTypes, DataTypeText, ParamsFields, CountryInfo, StationMetadataBasic, CoordinateRange } from '../../common/download.interface';
import { Months } from '../../common/constants';
import { toTitleCase, mutateArray } from '../../common/helpers';
import { filterOptions } from '../../MuiTheme';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { CoordinatesInput } from './CoordinatesInput';
import { Tooltip } from 'bootstrap';
import paramHints from '../../text/download-hints.json';

interface ParamsSectionProps {
  params: ParamsFields;
  onParamsChanged: (params: ParamsFields) => void;
  countries: CountryInfo[];
  stations: StationMetadataBasic[];
  regions: string[]
}

const isValidRange = (bound: 'start' | 'end', newBound: number, existingBound: number | null): boolean => {
  if (existingBound === null) return true;
  return bound === 'start' ? newBound < existingBound : newBound > existingBound;
}

export const ParamsSection = ({ params, onParamsChanged, countries, stations, regions }: ParamsSectionProps) => {

  const paramsChanged = (values: ParamsFields) => { // setting params here interferes with error checking
    onParamsChanged(values);  // because the field types are so irregular (not default input options), it's easier to handle them individually in the selectors themselves
  };

  useEffect(() => {     // initialize all tooltips on first render
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[toggle-hint="param-tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl: any) {
      return new Tooltip(tooltipTriggerEl, {
        placement: 'right',
        title: paramHints[tooltipTriggerEl.id as keyof typeof paramHints],
        delay: { "show": 900, "hide": 100 },
      })
    });
  }, []);

  return (
    <div className="params-section">
      <div className="heading-1 mb-4">Parameters</div>
      <Formik
        initialValues={{ ...params }}
        validate={paramsChanged}
        onSubmit={() => {}}>
        {({ errors, values, setFieldValue, setErrors }) => (
          <Form>
            <>

              {/* =========== YEARS PARAMS =========== */}
              <div className="heading-2">
                Years
                <i id='hint-years' toggle-hint="param-tooltip" className='material-icons help-icon'>help_outlined</i>
              </div>
              <div className="mb-1">
                Enter comma separated year ranges with each year in the range separated by a dash, or single years.
              </div>
              <input type='text' placeholder='Ex: "1888-1912, 1916, 2000-"' className="text-field" style={{ width: '50%' }}
                onBlur={(e: any) => {   // validate and update on blur because it's too slow otherwise
                  const yearRanges: Range[] = [];

                  // set field if field is empty
                  if (e.target.value.length === 0) {
                    setFieldValue('years', []);
                  } else {
                    const years = ((e.target.value).replace(/\s/g, '')).split(',');   // strip whitespace and split by comma

                    // theoretically I guess this could be done in a single regex but it's too complicated... believe me I tried :'(
                    years.forEach((yearRange: string) => {
                      if ((yearRange.length == 4) && (/\d{4}/.test(yearRange))) {   // case 1: single year
                        yearRanges.push({ single: parseInt(yearRange), start: null, end: null });
                      } else if ((yearRange.length == 5) && ((/-\d{4}/.test(yearRange)) || (/\d{4}-/.test(yearRange)))) {    // case 2: single bound year range (-year or year-)
                        yearRanges.push({
                          single: null,
                          start: yearRange[0] === '-' ? null : parseInt(yearRange.slice(0, 4)),   // case 2a: -year
                          end: yearRange[4] === '-' ? null : parseInt(yearRange.slice(1))         // case 2b: year-
                        });
                      } else if ((yearRange.length == 9) && (/\d{4}-\d{4}/.test(yearRange))) {      // case 3: bounded yer range (year1-year2)
                        const rangeStart = parseInt(yearRange.slice(0, 4));
                        const rangeEnd = parseInt(yearRange.slice(5));
                        if (isValidRange('start', rangeStart, rangeEnd)) {
                          yearRanges.push({ single: null, start: parseInt(yearRange.slice(0, 4)), end: parseInt(yearRange.slice(5)) });
                        };
                      };

                      if (yearRanges.length < years.length) {   // set error if user has entered ANY invalid range. need to set errors here as otherwise overwritten by validate function
                        setErrors({ ...errors, 'years': 'Please enter valid ranges' });
                      } else {
                        const { years, ...fieldErrors } = errors;
                        setErrors({ ...fieldErrors });    // if ranges are all valid, remove the errors for years
                        setFieldValue('years', yearRanges);
                      }
                    })
                  }
                }} />
              {errors.years && <div className="text-field-error">{errors.years as string}</div>}

              {/* =========== MONTHS PARAMS =========== */}
              <div className='heading-2 mt-4'>
                Months
                <i id='hint-months' toggle-hint="param-tooltip" className='material-icons help-icon'>help_outlined</i>
              </div>
              <div className="mb-1">Select months for which you want data for.</div>
              <div className='d-flex w-75 justify-content-start flex-wrap'>
                <FieldArray name='months' render={(arrayHelpers) => (
                  Object.values(Months).map((month: string, index: number) => (
                    <div className='col-3' key={index}>
                      <Checkbox value={month}
                        onChange={(e: any) => {
                          if (e.target.checked) {
                            arrayHelpers.push(month)
                          } else {
                            arrayHelpers.remove(params.months.indexOf(month as Months));
                          };
                        }} />{month}
                    </div>
                  )))} />
              </div>

              {/* =============== LOCATION PARAMS =============== */}

              {/* =========== COUNTRY PARAMS =========== */}
              <div className='d-flex flex-row mt-4'>
                <div className='col-6'>
                  <div className='heading-2'>
                    Countries
                    <i id='hint-countries' toggle-hint="param-tooltip" className='material-icons help-icon'>help_outlined</i>
                  </div>
                  <div className="mb-1">Select countries to include.</div>
                  <Autocomplete
                    multiple
                    options={countries}
                    getOptionLabel={(option) => `(${option.code}) ${toTitleCase(option.country)}`}
                    onChange={(event: any, newValue) => {
                      setFieldValue('countries', newValue);
                    }}
                    isOptionEqualToValue={(option, value) => option.code === value.code}
                    style={{ width: '60%' }}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} variant="outlined" fullWidth />
                      )
                    }} />
                </div>

                {/* =========== REGION PARAMS =========== */}
                <div className='col-6'>
                  <div className='heading-2'>
                    Regions
                    <i id='hint-regions' toggle-hint="param-tooltip" className='material-icons help-icon'>help_outlined</i>
                  </div>
                  <div className="mb-1">Region specifications are not available for all countries.</div>
                  <Autocomplete
                    multiple
                    options={params.countries.length > 0 ?
                      (params.countries.reduce((accumulator, currentCountry) => accumulator.concat(currentCountry.supportedRegions), [])
                      ) : regions}
                    onChange={(event: any, newValue) => {
                      setFieldValue('regions', newValue);
                    }}
                    style={{ width: '60%' }}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} variant="outlined" fullWidth />
                      )
                    }} />
                </div>
              </div>

              {/* =========== COORDINATES PARAMS =========== */}
              <div className='d-flex flex-row mt-4'>
                <div className='col-4'>
                  <div className='heading-2'>
                    Latitude
                    <i id='hint-latitude' toggle-hint="param-tooltip" className='material-icons help-icon'>help_outlined</i>
                  </div>
                  <div className="mb-1">Enter latitude range.</div>
                </div>
                <div className='col-4'>
                  <div className='heading-2'>
                    Longitude
                    <i id='hint-longitude' toggle-hint="param-tooltip" className='material-icons help-icon'>help_outlined</i>
                  </div>
                  <div className="mb-1">Enter longitude range.</div>
                </div>
                <div className='col-4'>
                  <div className='d-flex flex-row justify-content-between'>
                    <div>
                      <div className='heading-2'>
                        Elevation
                        <i id='hint-elevation' toggle-hint="param-tooltip" className='material-icons help-icon'>help_outlined</i>
                      </div>
                      <div className="mb-1">Enter elevation range.</div>
                    </div>
                    <button type='button'
                      id='hint-addRange' toggle-hint="param-tooltip"
                      onClick={(e) =>
                        setFieldValue('coordinates', mutateArray(values.coordinates, values.coordinates.length, {   // add new empty coordinate input
                          latitude: { single: null, start: null, end: null },
                          longitude: { single: null, start: null, end: null },
                          elevation: { single: null, start: null, end: null }
                        }))}
                      className='plus-button d-flex align-self-center right-0'>
                      <div>+</div>
                    </button>
                  </div>
                </div>
              </div>
              {(values.coordinates).map((range: CoordinateRange, index: number) => (
                <CoordinatesInput
                  onCoordinateInputChange={(parameter: 'latitude' | 'longitude' | 'elevation', bound: 'start' | 'end', newValue: string): boolean => {
                    if ((newValue.length === 0) ||
                      (/-?\d*.?\d+/.test(newValue) && isValidRange(bound, Number(newValue), range[parameter][bound === 'start' ? 'end' : 'start']))) {
                      const newCoordinates = { ...values.coordinates[index] };
                      (newCoordinates[parameter])[bound] = newValue.length === 0 ? null : Number(newValue);
                      setFieldValue('coordinates', mutateArray(values.coordinates, index, newCoordinates));
                      return true
                    } else return false;    // returning booleans for each input row to individually handle errors... might change this later on
                  }}
                  deleteRow={() => setFieldValue('coordinates', mutateArray(values.coordinates, index))}
                  key={index} />
              ))}

              {/* =========== STATIONS PARAMS =========== */}
              <div className='heading-2 mt-4'>
                Stations
                <i id='hint-stations' toggle-hint="param-tooltip" className='material-icons help-icon'>help_outlined</i>
              </div>
              <div className="mb-1">Search for and select stations by name.</div>
              <Autocomplete
                multiple
                options={stations}
                filterOptions={filterOptions}
                getOptionLabel={(option: StationMetadataBasic) => `(${option.station}) ${option.name !== null ? toTitleCase(option.name) : ''}`}
                onChange={(event: any, newValue) => {
                  setFieldValue('stations', newValue);
                }}
                isOptionEqualToValue={(option: StationMetadataBasic, value: StationMetadataBasic) => option.station === value.station}
                style={{ width: '50%' }}
                renderInput={(params) => {
                  return (
                    <TextField {...params} variant="outlined" fullWidth />
                  )
                }} />

              {/* =========== DATA TYPE PARAMS =========== */}
              <div className='heading-2 mt-4'>
                Data Types
                <i id='hint-dataTypes' toggle-hint="param-tooltip" className='material-icons help-icon'>help_outlined</i>
              </div>
              <div className="mb-2">Select what type of station data to download.</div>
              <div className='d-flex w-100 justify-content-start'>
                <FieldArray name='dataTypes' render={(arrayHelpers) => (
                  ['prcp', 'anom', 'anom_pcnt', 'cycles', 'stations'].map((type: string, index: number) => (
                    <div className='d-flex flex-row align-items-center' key={index} style={{ width: "20%" }} >
                      <Checkbox
                        value={type}
                        onChange={(e: any) => {
                          if (e.target.checked) {
                            arrayHelpers.push(type)
                          } else {
                            arrayHelpers.remove(params.dataTypes.indexOf(type as DataTypes));
                          };
                        }} />
                      <div>{DataTypeText[type]}</div>
                    </div>
                  )))} />
              </div>
            </>
          </Form>
        )}
      </Formik>
    </div >
  )
}