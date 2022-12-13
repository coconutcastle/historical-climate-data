
interface CoordinatesInputProps {
  onCoordinateInputChange: (parameter: 'latitude' | 'longitude' | 'elevation', bound: 'start' | 'end', newValue: string) => void;
  deleteRow: () => void;
}

// validating and updating all input changes on blur as otherwise it's too slow and laggy
export const CoordinatesInput = ({ onCoordinateInputChange, deleteRow }: CoordinatesInputProps) => {

  return (
    <div className='d-flex flex-row mt-1'>
      <div className='col-4'>
        <div className='d-flex flex-row align-items-center'>
          <input type='text'
            onBlur={(e) => onCoordinateInputChange('latitude', 'start', e.target.value)}
            className="text-field w-25" />
          <div className='pe-2 ps-2'>-</div>
          <input type='text'
            onBlur={(e) => onCoordinateInputChange('latitude', 'end', e.target.value)}
            className="text-field w-25" />
          <div className='text-field-emphasis ps-2'>N</div>
        </div>
      </div>
      <div className='col-4'>
        <div className='d-flex flex-row align-items-center'>
          <input type='text'
            onBlur={(e) => onCoordinateInputChange('longitude', 'start', e.target.value)}
            className="text-field w-25" />
          <div className='pe-2 ps-2'>-</div>
          <input type='text'
            onBlur={(e) => onCoordinateInputChange('longitude', 'end', e.target.value)}
            className="text-field w-25" />
          <div className='text-field-emphasis ps-2'>E</div>
        </div>
      </div>
      <div className='col-4'>
        <div className='d-flex flex-row align-items-center'>
          <input type='text'
            onBlur={(e) => onCoordinateInputChange('elevation', 'start', e.target.value)}
            className="text-field w-25" />
          <div className='pe-2 ps-2'>-</div>
          <input type='text'
            onBlur={(e) => onCoordinateInputChange('elevation', 'end', e.target.value)}
            className="text-field w-25" />
          <div className='text-field-emphasis ps-2'>m</div>
          <button type='button' className='plus-button ms-auto' onClick={(e) => deleteRow()}>
            <div>-</div>
          </button>
        </div>

      </div>
    </div>
  )
}