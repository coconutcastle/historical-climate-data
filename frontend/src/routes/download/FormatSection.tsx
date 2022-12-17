import { Field, Form, Formik, ErrorMessage } from 'formik';
import { DataTypes } from '../../common/download.interface';
import { Radio } from '@mui/material';
import { PreviewTable } from './PreviewTable';

interface FormatSectionProps {
  dataTypes: DataTypes[]
}

interface FormatFields {
  monthlyDataViewFormat: 'condensed' | 'spread' | 'na';
  combineDates: 'separate' | 'combine' | 'na';     // only applicable in spread view
  dateFormat: string | null;
  files: 'byStation' | 'concat';
}

export const FormatSection = ({ dataTypes }: FormatSectionProps) => {

  const formatFieldsChanged = (values: FormatFields) => {
    console.log(values)
  }

  console.log(dataTypes)

  return (
    <div className="params-section mt-3">
      <div className="heading-1 mb-4">
        Format Download
      </div>
      <Formik
        initialValues={{
          monthlyDataViewFormat: 'na',
          combineDates: 'na',
          dateFormat: null,
          files: 'concat'
        }}
        validate={formatFieldsChanged}
        onSubmit={() => console.log('submitted')}
      >
        {({ errors, values, setFieldValue, setErrors }) => (
          <Form>
            <>
              {/* =========== DATE FORMAT =========== */}
              <div className='heading-2'>Monthly Data View</div>
              <div className="mb-1">Select if you would like monthly data (precipitation, anomaly) in columns or rows.</div>
              <div className='d-flex flex-row justify-content-start'>
                <div className='d-flex flex-row align-items-center col-5'>
                  <Radio
                    checked={values.monthlyDataViewFormat === 'condensed'}
                    onChange={() => setFieldValue('monthlyDataViewFormat', 'condensed')}
                    disabled={!(dataTypes.includes('prcp') || dataTypes.includes('anom'))} />
                  Condensed
                </div>
                <div className='d-flex flex-row align-items-center col-5'>
                  <Radio
                    checked={values.monthlyDataViewFormat === 'spread'}
                    onChange={() => setFieldValue('monthlyDataViewFormat', 'spread')}
                    disabled={!(dataTypes.includes('prcp') || dataTypes.includes('anom'))} />
                  Spread
                </div>
              </div>


              {/* =========== DATE FORMAT =========== */}
              <div className='heading-2 mt-4'>Date</div>
              <div className="mb-1">Only applicable to spread view data (monthly statistics and monthly data if selected).</div>
              <div className='d-flex flex-row justify-content-start align-items-start'>
                <div className='d-flex flex-row align-items-center col-5'>
                  <Radio
                    checked={values.combineDates === 'separate'}
                    onChange={() => setFieldValue('combineDates', 'separate')}
                    disabled={!((dataTypes.includes('cycles')) || values.monthlyDataViewFormat === 'spread')} />
                  Keep year and month in separate columns
                </div>
                <div className='d-flex flex-row col-5'>
                  <Radio
                    checked={values.combineDates === 'combine'}
                    onChange={() => setFieldValue('combineDates', 'combine')}
                    disabled={!((dataTypes.includes('cycles')) || values.monthlyDataViewFormat === 'spread')} />
                  <div className='d-flex flex-column' style={{ marginTop: '6px' }}>
                    <div>Combine year and month</div>
                    <div className='mb-1 mt-3'>Enter date format:</div>
                    <Field type='text' name='dateFormat' className="text-field" disabled={values.combineDates !== 'combine'} placeholder='Ex: "YYYY-MM"' />
                  </div>
                </div>

              </div>

              {/* =========== NUMBER FILES FORMAT =========== */}
              <div className='heading-2 mt-4 mb-1'>Files</div>
              <div className='d-flex flex-row justify-content-start'>
                <div className='d-flex flex-row align-items-center col-5'>
                  <Radio
                    checked={values.files === 'concat'}
                    onChange={() => setFieldValue('files', 'concat')} />
                  Concatenate station data
                </div>
                <div className='d-flex flex-row align-items-center col-5'>
                  <Radio
                    checked={values.files === 'byStation'}
                    onChange={() => setFieldValue('files', 'byStation')} />
                  Separate files per station
                </div>
              </div>

              {/* =========== PREVIEW FORMAT =========== */}
              <div className='heading-2 mt-4 mb-1'>Preview</div>
              <PreviewTable dataTypes={dataTypes} downloadData={[]} />

            </>
          </Form>
        )}
      </Formik>
    </div>
  )
}