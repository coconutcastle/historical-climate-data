import { useState } from "react";

interface CoordinatesInputProps {
  onCoordinateInputChange: (parameter: 'latitude' | 'longitude' | 'elevation', bound: 'start' | 'end', newValue: string) => boolean;
  deleteRow: () => void;
}

interface coordinateErrors {
  latitude: string | null;
  longitude: string | null;
  elevation: string | null
}

// validating and updating all input changes on blur as otherwise it's too slow and laggy
export const CoordinatesInput = ({ onCoordinateInputChange, deleteRow }: CoordinatesInputProps) => {
  const [errors, setErrors] = useState<coordinateErrors>({ latitude: null, longitude: null, elevation: null });

  const handleInputChange = (parameter: 'latitude' | 'longitude' | 'elevation', bound: 'start' | 'end', newValue: string) => {
    const passed = onCoordinateInputChange(parameter, bound, newValue);
    const newErrors = { ...errors };
    newErrors[parameter] = passed ? null : 'Invalid range';
    setErrors(newErrors)
  };

  return (
    <div className='d-flex flex-row mt-1'>
      <div className='col-4'>
        <div className='d-flex flex-row align-items-center'>
          <input type='text'
            onBlur={(e) => handleInputChange('latitude', 'start', e.target.value)}
            className="text-field w-25" />
          <div className='pe-2 ps-2'>-</div>
          <input type='text'
            onBlur={(e) => handleInputChange('latitude', 'end', e.target.value)}
            className="text-field w-25" />
          <div className='text-field-emphasis ps-2'>N</div>
        </div>
        {errors.latitude !== null && <div className="text-field-error">{errors.latitude}</div>}
      </div>
      <div className='col-4'>
        <div className='d-flex flex-row align-items-center'>
          <input type='text'
            onBlur={(e) => handleInputChange('longitude', 'start', e.target.value)}
            className="text-field w-25" />
          <div className='pe-2 ps-2'>-</div>
          <input type='text'
            onBlur={(e) => handleInputChange('longitude', 'end', e.target.value)}
            className="text-field w-25" />
          <div className='text-field-emphasis ps-2'>E</div>
        </div>
        {errors.longitude !== null && <div className="text-field-error">{errors.longitude}</div>}
      </div>
      <div className='col-4'>
        <div className='d-flex flex-row align-items-center'>
          <input type='text'
            onBlur={(e) => handleInputChange('elevation', 'start', e.target.value)}
            className="text-field w-25" />
          <div className='pe-2 ps-2'>-</div>
          <input type='text'
            onBlur={(e) => handleInputChange('elevation', 'end', e.target.value)}
            className="text-field w-25" />
          <div className='text-field-emphasis ps-2'>m</div>
          <button id='hint-removeRange' toggle-hint="param-tooltip" type='button' className='plus-button ms-auto' onClick={(e) => deleteRow()}>
            <div>-</div>
          </button>
        </div>
        {errors.elevation !== null && <div className="text-field-error">{errors.elevation}</div>}
      </div>
    </div>
  )
}