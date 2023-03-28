import { useEffect } from 'react';
import { Form, Formik } from 'formik';
import { FormatFields, ParamsFields, StationMetadata, DataTypes } from '../../../common/download.interface';
import { Radio } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { Tooltip } from 'bootstrap';
import { PreviewTable } from './PreviewTable';
import formatHints from '../../../text/format-hints.json';

interface FormatSectionProps {
  format: FormatFields;
  onFormatChanged: (format: FormatFields) => void;
  params: ParamsFields;
  formatData: (data: any[], type: DataTypes, stationMetadata?: StationMetadata[], forPreview?: boolean) => any[];
}

export const FormatSection = ({ format, onFormatChanged, params, formatData }: FormatSectionProps) => {

  const formatFieldsChanged = (values: FormatFields) => {
    onFormatChanged(values);
  };

  useEffect(() => {     // initialize all tooltips on first render
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[toggle-hint="format-tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl: any) {
      return new Tooltip(tooltipTriggerEl, {
        placement: 'right',
        title: formatHints[tooltipTriggerEl.id as keyof typeof formatHints],
        delay: { "show": 900, "hide": 100 },
      })
    });
  }, []);

  return (
    <div className="params-section mt-3">
      <div className="heading-1 mb-4">
        Format Download
      </div>
      <Formik
        initialValues={{ ...format }}
        validate={formatFieldsChanged}
        onSubmit={() => console.log('submitted')}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <>
              {/* =========== DATE FORMAT =========== */}
              <div className='heading-2'>
                Monthly Data View
                <i id='hint-monthlyView' toggle-hint="format-tooltip" className='material-icons help-icon'>help_outlined</i>
              </div>
              <div className="mb-1">Select if you would like monthly data (precipitation, anomaly) in columns or rows.</div>
              <div className='d-flex flex-row justify-content-start'>
                <div className='d-flex flex-row align-items-center col-5'>
                  <Radio
                    checked={values.monthlyDataViewFormat === 'condensed'}
                    onChange={() => setFieldValue('monthlyDataViewFormat', 'condensed')}
                    disabled={!(params.dataTypes.includes('prcp') || params.dataTypes.includes('anom') || params.dataTypes.includes('anom_pcnt'))} />
                  Condensed
                </div>
                <div className='d-flex flex-row align-items-center col-5'>
                  <Radio
                    checked={values.monthlyDataViewFormat === 'spread'}
                    onChange={() => setFieldValue('monthlyDataViewFormat', 'spread')}
                    disabled={!(params.dataTypes.includes('prcp') || params.dataTypes.includes('anom') || params.dataTypes.includes('anom_pcnt'))} />
                  Spread
                </div>
              </div>


              {/* =========== DATE FORMAT =========== */}
              <div className='heading-2 mt-4'>
                Date
                <i id='hint-dateFormat' toggle-hint="format-tooltip" className='material-icons help-icon'>help_outlined</i>
              </div>
              <div className="mb-1">Only applicable to spread view montly readings data.</div>
              <div className='d-flex flex-row justify-content-start align-items-start'>
                <div className='d-flex flex-row col-5'>
                  <Radio
                    checked={values.combineDates === 'combine'}
                    onChange={() => setFieldValue('combineDates', 'combine')}
                    disabled={!(values.monthlyDataViewFormat === 'spread')} />
                  <div className='d-flex flex-column' style={{ marginTop: '6px' }}>
                    <div>Combine year and month</div>
                    <div className='mb-1 mt-2'>Enter date format:</div>
                    <input type='text' placeholder='Ex: "YYYY-MM"' className="text-field" disabled={values.combineDates !== 'combine'}
                      onBlur={(e: any) => setFieldValue('dateFormat', e.target.value)} />
                    {/* <Field type='text' name='dateFormat' className="text-field" disabled={values.combineDates !== 'combine'} placeholder='Ex: "YYYY-MM"' /> */}
                  </div>
                </div>
                <div className='d-flex flex-row align-items-center col-5'>
                  <Radio
                    checked={values.combineDates === 'separate'}
                    onChange={() => setFieldValue('combineDates', 'separate')}
                    disabled={!(values.monthlyDataViewFormat === 'spread')} />
                  Keep year and month in separate columns
                </div>

              </div>

              {/* =========== NUMBER FILES FORMAT =========== */}
              <div className='heading-2 mt-4 mb-1'>
                Insert Station Metadata
                <i id='hint-metadata' toggle-hint="format-tooltip" className='material-icons help-icon'>help_outlined</i>
              </div>
              <div className="mb-1">If downloading station metadata, you can choose to insert the metadata into the data files.</div>
              <Checkbox value={format.insertMetadata} 
                disabled={!params.dataTypes.includes('stations')}
                onChange={(e: any) => {
                  setFieldValue('insertMetadata', e.target.checked);
                }} />Insert metadata

              {/* =========== NUMBER FILES FORMAT =========== */}
              <div className='heading-2 mt-4 mb-1'>
                Files
                <i id='hint-fileFormat' toggle-hint="format-tooltip" className='material-icons help-icon'>help_outlined</i>
              </div>
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
              <div className='heading-2 mt-4 mb-2'>
                Preview
                <i id='hint-preview' toggle-hint="format-tooltip" className='material-icons help-icon'>help_outlined</i>
              </div>
              {params.dataTypes.length > 0 ? <PreviewTable params={params} formatData={formatData} /> : <div>
                Preview sample data using the selected formatting options. Select the desired data types.
              </div>}

            </>
          </Form>
        )}
      </Formik>
    </div>
  )
}