import { Field, Form, Formik, ErrorMessage } from 'formik';
import { Months, Range, DataTypes } from '../../common/download.interface';

interface ParamsFields {
  years: Range[];
  months: Months[];
  countries: string[];
  regions: string[];
  latitude: Range[];
  longitude: Range[];
  elevation: Range[];
  station: string[];
  dataTypes: DataTypes[];
}

export const ParamsSection = () => {
  return (
    <div className="params-section">
      <div className="heading-1 mb-4">
        Parameters
      </div>
      <div className="heading-2">
        Years
      </div>
    </div>
  )
}