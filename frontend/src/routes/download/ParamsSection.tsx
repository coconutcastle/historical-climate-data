import { Field, Form, Formik, ErrorMessage, FieldArray } from 'formik';
import { Months, Range, DataTypes, ParamsFields, CountryInfo, StationMetadataBasic } from '../../common/download.interface';
import { useQuery } from 'react-query';
import { toTitleCase, mutateArray } from '../../common/helpers';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';

interface ParamsSectionProps {
  params: ParamsFields;
  onParamsChanged: (params: ParamsFields) => void;
  countries: CountryInfo[];
  stations: StationMetadataBasic[];
}

const parseRange = (textRange: string): Range[] => {
  // const rangePattern = /(\d{0,4})(-)(\d{0,4})/g;
  ///(\d{0})(?!=\d{4})(?!<=\d{0})(\d{4})(-)(\d{0})(?!=\d{4})(?!<=\d{0})(\d{4})/g
  const rangePattern = /(\d{4})-(\d{4})/g
  console.log(rangePattern.exec('1945-1958'));
  const ranges = (textRange.replace(/\s/g, '')).split(',');  //remove whitespace and then split by comma
  return ranges.map((range: string) => {
    if (!range.includes('-')) {
      return ({
        single: parseInt(range),
        start: null,
        end: null
      })
    } else {
      const matches = rangePattern.exec(range)
      return ({
        single: 0,
        start: range[0] == '-' ? null : 0,
        end: null
      })
    }
  })
}

export const ParamsSection = ({ params, onParamsChanged, countries, stations }: ParamsSectionProps) => {

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
              <Field name='years' type='text' placeholder="Year ranges" className="text-field" style={{ width: '50%' }} />

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
                    }}/>{month}
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
                    style={{ width: '50%' }}
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          variant="outlined"
                          fullWidth
                        />
                    )}}
                  />
                </div>
                <div className='col-6'>
                  <div className='heading-2'>
                    Regions
                  </div>
                  <div className="mb-1">
                    Region specifications are not available for all countries.
                  </div>
                  <Autocomplete
                    id="combo-box-demo"
                    options={['Canada', 'USA']}
                    style={{ width: '50%' }}
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          variant="outlined"
                          fullWidth
                        />
                    )}}
                  />
                </div>
              </div>

              {/* COORDINATES PARAMS */}
              <div className='d-flex flex-row mt-4'>
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
              </div>

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
                style={{ width: '50%' }}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      variant="outlined"
                      fullWidth
                    />
                )}}
              />

              {/* DATA TYPE PARAMS */}
              <div className='heading-2 mt-4'>
                Data Types
              </div>
              <div className="mb-1">
                Select what type of station data to download.
              </div>
              <div className='d-flex w-100 justify-content-start'>
                <div className='col-4'>
                  <Checkbox value={'prcp'} 
                  onChange={(e: any) => {
                    if (e.target.checked) {
                      setFieldValue('dataTypes', [...params.dataTypes, 'prcp']);
                    } else {
                      setFieldValue('dataTypes', mutateArray(params.dataTypes, params.dataTypes.indexOf('prcp')));
                    }
                  }}/>Monthly Precipitation Readings
                </div>
                <div className='col-4'>
                  <Checkbox value={'anom'}
                  onChange={(e: any) => {
                    if (e.target.checked) {
                      setFieldValue('dataTypes', [...params.dataTypes, 'anom']);
                    } else {
                      setFieldValue('dataTypes', mutateArray(params.dataTypes, params.dataTypes.indexOf('anom')));
                    }
                  }}/>Monthly Precipitation Anomalies
                </div>
                <div className='col-4'>
                  <Checkbox value={'cycles'}
                  onChange={(e: any) => {
                    if (e.target.checked) {
                      setFieldValue('dataTypes', [...params.dataTypes, 'cycles']);
                    } else {
                      setFieldValue('dataTypes', mutateArray(params.dataTypes, params.dataTypes.indexOf('cycles')));
                    }
                  }}/>Statistics per Month
                </div>
              </div>
            </>
          </Form>
        )}
      </Formik>

    </div >
  )
}