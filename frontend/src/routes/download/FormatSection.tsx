import { Field, Form, Formik, ErrorMessage } from 'formik';
import { DataTypes } from '../../common/download.interface';
import { Radio } from '@mui/material';

interface FormatSectionProps {
  dataTypes: DataTypes[]
}

export const FormatSection = ({ dataTypes }: FormatSectionProps) => {
  return (
    <div className="params-section mt-3">
      <div className="heading-1 mb-4">
        Format Download
      </div>
      <Formik
        initialValues={{}}
        validate={() => { }}
        onSubmit={() => console.log('submitted')}
      >
        {({ errors, values, setFieldValue, setErrors }) => (
          <Form>
            <>

              {/* =========== DATE FORMAT =========== */}
              <div className='heading-2'>Date</div>
              <div className='d-flex flex-row align-items-center'>
                <Radio />Keep year and month in separate columns
              </div>
              <div className='d-flex flex-row align-items-center'>
                <Radio />Combine year and month
              </div>

              {/* =========== PREVIEW FORMAT =========== */}
              <div className='heading-2'>Preview</div>

            </>
          </Form>
        )}
      </Formik>
    </div>
  )
}