import { Field, Form, Formik, ErrorMessage, FieldArray } from 'formik';
import { Months, Range, DataTypes, DataTypeText, ParamsFields, CountryInfo, StationMetadataBasic, CoordinateRange } from '../../common/download.interface';
import { useQuery } from 'react-query';
import { toTitleCase, mutateArray } from '../../common/helpers';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { CoordinatesInput } from './CoordinatesInput';

interface ParamsSectionProps {
  params: ParamsFields;
  onParamsChanged: (params: ParamsFields) => void;
  countries: CountryInfo[];
  stations: StationMetadataBasic[];
  regions: string[]
}

export const ParamsSection = ({ params, onParamsChanged, countries, stations, regions }: ParamsSectionProps) => {

  // const [coordinateRows, setCoordinateRows] = useState<CoordinateRow>({})

  const paramsChanged = (values: ParamsFields) => {
    console.log(values);
    onParamsChanged(values);
  };

  return (
    <div className="params-section">
      <div className="heading-1 mb-4">
        Parameters
      </div>
      <Formik
        initialValues={{ ...params }}
        validate={paramsChanged}
        onSubmit={() => {
          console.log('submitted')
        }}>
        {({ errors, values, setFieldValue, setErrors }) => (
          <Form>
            <>
              {/* YEARS PARAMS */}
              <div className="heading-2">
                Years
              </div>
              <div className="mb-1">
                Enter comma separated year ranges with each year in the range separated by a dash, or single years.
              </div>
              <input type='text' placeholder="Year ranges" className="text-field" style={{ width: '50%' }}
                onBlur={(e: any) => {
                  const yearRanges: Range[] = [];
                  const years = ((e.target.value).replace(/\s/g, '')).split(',');

                  years.forEach((year: string) => {
                    if ((year.length == 4) && (/\d{4}/.test(year))) {
                      yearRanges.push({ single: parseInt(year), start: null, end: null });
                    } else if ((year.length == 5) && ((/-\d{4}/.test(year)) || (/\d{4}-/.test(year)))) {
                      yearRanges.push({
                        single: null,
                        start: year[0] === '-' ? null : parseInt(year.slice(0, 4)),
                        end: year[4] === '-' ? null : parseInt(year.slice(1))
                      });
                    } else if ((year.length == 9) && (/\d{4}-\d{4}/.test(year))) {
                      yearRanges.push({ single: null, start: parseInt(year.slice(0, 4)), end: parseInt(year.slice(5)) });
                    };

                    if (yearRanges.length < years.length) {
                      setErrors({ ...errors, 'years': 'Please enter valid ranges' });
                    } else {
                      const { years, ...fieldErrors } = errors;
                      setErrors({ ...fieldErrors });
                      setFieldValue('years', yearRanges);
                    }
                  })
                }} />
              {errors.years && <div className="text-field-error">{errors.years as string}</div>}

              {/* MONTHS PARAMS */}
              <div className='heading-2 mt-4'>
                Months
              </div>
              <div className="mb-1">
                Select months for which you want data for.
              </div>
              <div className='d-flex w-75 justify-content-start flex-wrap'>
                <FieldArray name='months' render={(arrayHelpers) => (
                  Object.values(Months).map((month: string, index: number) => (
                    <div className='col-3' key={index}>
                      <Checkbox
                        value={month}
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

              {/* LOCATION PARAMS */}
              <div className='d-flex flex-row mt-4'>
                <div className='col-6'>
                  <div className='heading-2'>
                    Countries
                  </div>
                  <div className="mb-1">
                    Select countries to include.
                  </div>
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
                        <TextField
                          {...params}
                          variant="outlined"
                          fullWidth
                        />
                      )
                    }} />
                </div>
                <div className='col-6'>
                  <div className='heading-2'>
                    Regions
                  </div>
                  <div className="mb-1">
                    Region specifications are not available for all countries.
                  </div>
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
                        <TextField
                          {...params}
                          variant="outlined"
                          fullWidth
                        />
                      )
                    }} />
                </div>
              </div>

              {/* COORDINATES PARAMS */}
              {/* <div className='d-flex flex-row mt-4'>
                <div className='col-4'>
                  <div className='heading-2'>
                    Latitude
                  </div>
                  <div className="mb-1">
                    Enter latitude range.
                  </div>
                  <div className='d-flex flex-row align-items-center'>
                    <input type='text' className="text-field w-25" />
                    <div className='pe-2 ps-2'>-</div>
                    <input type='text' className="text-field w-25" />
                    <div className='text-field-emphasis ps-2'>N</div>
                  </div>
                </div>
                <div className='col-4'>
                  <div className='heading-2'>
                    Longitude
                  </div>
                  <div className="mb-1">
                    Enter longitude range.
                  </div>
                  <div className='d-flex flex-row align-items-center'>
                    <input type='text' className="text-field w-25" />
                    <div className='pe-2 ps-2'>-</div>
                    <input type='text' className="text-field w-25" />
                    <div className='text-field-emphasis ps-2'>E</div>
                  </div>
                </div>
                <div className='col-4'>
                  <div className='heading-2'>
                    Elevation
                  </div>
                  <div className="mb-1">
                    Enter elevation range.
                  </div>
                  <div className='d-flex flex-row align-items-center'>
                    <input type='text' className="text-field w-25" />
                    <div className='pe-2 ps-2'>-</div>
                    <input type='text' className="text-field w-25" />
                    <div className='text-field-emphasis ps-2'>m</div>
                    <button type='button' className='plus-button'>
                      <div>+</div>
                    </button>
                  </div>
                </div>
              </div> */}
              <div className='d-flex flex-row mt-4'>
                <div className='col-4'>
                  <div className='heading-2'>
                    Latitude
                  </div>
                  <div className="mb-1">
                    Enter latitude range.
                  </div>
                </div>
                <div className='col-4'>
                  <div className='heading-2'>
                    Longitude
                  </div>
                  <div className="mb-1">
                    Enter longitude range.
                  </div>
                </div>
                <div className='col-4'>
                  <div className='d-flex flex-row justify-content-between'>
                    <div>
                      <div className='heading-2'>
                        Elevation
                      </div>
                      <div className="mb-1">
                        Enter elevation range.
                      </div>
                    </div>
                    <button type='button' 
                    onClick={(e) => 
                      setFieldValue('coordinates', mutateArray(values.coordinates, values.coordinates.length, {
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
                range={range} 
                set={index} 
                onCoordinateInputChange={(parameter: 'latitude' | 'longitude' | 'elevation', bound: 'start' | 'end', newValue: string) => {
                  const newCoordinates = {...values.coordinates[index]};
                  (newCoordinates[parameter])[bound] = parseInt(newValue);
                  setFieldValue('coordinates', mutateArray(values.coordinates, index, newCoordinates));
                }}
                deleteRow={() => setFieldValue('coordinates', mutateArray(values.coordinates, index))}
                key={index} />
              ))}

              {/* STATIONS PARAMS */}
              <div className='heading-2 mt-4'>
                Stations
              </div>
              <div className="mb-1">
                Search for and select stations by name.
              </div>
              <Autocomplete
                multiple
                options={stations}
                getOptionLabel={(option) => `(${option.code}) ${option.name !== null ? toTitleCase(option.name) : ''}`}
                onChange={(event: any, newValue) => {
                  setFieldValue('stations', newValue);
                }}
                isOptionEqualToValue={(option, value) => option.code === value.code}
                style={{ width: '50%' }}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      variant="outlined"
                      fullWidth
                    />
                  )
                }}
              />

              {/* DATA TYPE PARAMS */}
              <div className='heading-2 mt-4'>
                Data Types
              </div>
              <div className="mb-1">
                Select what type of station data to download.
              </div>
              <div className='d-flex w-100 justify-content-start'>
                <FieldArray name='dataTypes' render={(arrayHelpers) => (
                  ['prcp', 'anom', 'cycles'].map((type: string, index: number) => (
                    <div className='col-4' key={index}>
                      <Checkbox
                        value={type}
                        onChange={(e: any) => {
                          if (e.target.checked) {
                            arrayHelpers.push(type)
                          } else {
                            arrayHelpers.remove(params.dataTypes.indexOf(type as DataTypes));
                          };
                        }} />{DataTypeText[type]}
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