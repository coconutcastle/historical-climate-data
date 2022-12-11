import { Field, Form, Formik, ErrorMessage } from 'formik';
import { Months, Range, DataTypes, ParamsFields } from '../../common/download.interface';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

interface ParamsSectionProps {
  params: ParamsFields;
  onParamsChanged: (params: ParamsFields) => void;
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

export const ParamsSection = ({ params, onParamsChanged }: ParamsSectionProps) => {

  const validateFields = (values: ParamsFields) => {
    const errors: Record<string, string> = {};

    if (values.dataTypes.length == 0) {
      errors['dataTypes'] = "Please select what data you'd like to download";
    };

    //check to see if all year range strings are valid 4-digit numbers

    if (Object.keys(errors).length > 0) {
      return errors;
    } else {
      onParamsChanged(values);    //if no errors in the fields, set the new parameters
    }
  }


  return (
    <div className="params-section">
      <div className="heading-1 mb-4">
        Parameters
      </div>
      <Formik
        initialValues={{ ...params }}
        validate={validateFields}
        onSubmit={() => {
          console.log('submitted')
        }}
      >
        {({ errors, values, setFieldValue, setErrors }) => (
          <Form>
            <>
              {/* YEARS PARAMS */}
              <div className="heading-2">
                Years
              </div>
              <div>
                Enter comma separated year ranges with each year in the range separated by a dash, or single years.
              </div>
              <Field name='years' type='text' placeholder="Year ranges" className="text-field" style={{ width: '50%' }} />

              {/* MONTHS PARAMS */}
              <div className='heading-2'>
                Months
              </div>
              <div>
                Select months for which you want data for.
              </div>

              {/* LOCATION PARAMS */}
              <div className='d-flex flex-row'>
                <div className='col-6'>
                  <div className='heading-2'>
                    Countries
                  </div>
                  <div>
                    Select countries to include.
                  </div>
                  {/* <Autocomplete
                    disablePortal
                    id="combo-box-courses"
                    onChange={(event: any, newValue: string | null) => {
                      console.log(newValue)
                      // const yearCheck = (values.years).replace(/\s/g, '');
                    }}
                    inputValue={'Canada'}
                    onInputChange={(event, newInputValue) => {
                      console.log(newInputValue)
                    }}
                    options={['Canada', 'USA']}
                    sx={{ width: 300, borderColor: "#8f78a2", marginTop: '30px', }}
                    renderInput={(params) =>
                      <TextField {...params} label="Course" />}
                  /> */}
                  <Autocomplete
                    id="combo-box-demo"
                    options={['Canada', 'USA']}
                    // classes={useStyles}
                    // options={top100Films}
                    // getOptionLabel={(option) => option.title}
                    style={{ width: '50%' }}
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          variant="outlined"
                          fullWidth
                        />
                      );
                    }}
                  />

                </div>
                <div className='col-6'>
                  <div className='heading-2'>
                    Regions
                  </div>
                  <div>
                    Region specifications are not available for all countries.
                  </div>

                </div>
              </div>

              {/* COORDINATES PARAMS */}
              <div className='d-flex flex-row'>
                <div className='col-4'>
                  <div className='heading-2'>
                    Latitude
                  </div>
                  <div>
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
                  <div>
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
                  <div>
                    Enter elevation range.
                  </div>
                  <div className='d-flex flex-row align-items-center'>
                    <input type='text' className="text-field w-25" />
                    <div className='pe-2 ps-2'>-</div>
                    <input type='text' className="text-field w-25" />
                    <div className='text-field-emphasis ps-2'>m</div>
                  </div>
                </div>
              </div>

              {/* STATIONS PARAMS */}
              <div className='heading-2'>
                Stations
              </div>
              <div>
                Search for and select stations by name.
              </div>

              {/* DATA TYPE PARAMS */}
              <div className='heading-2'>
                Data Types
              </div>
              <div>
                Select what type of station data to download.
              </div>
            </>
          </Form>
        )}
      </Formik>

    </div >
  )
}