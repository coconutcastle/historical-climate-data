import { useState } from "react";
import { CoordinateRange } from "../../common/download.interface";

interface CoordinatesInputProps {
  range: CoordinateRange;
  set: number;
  onCoordinateInputChange: (parameter: 'latitude' | 'longitude' | 'elevation', bound: 'start' | 'end', newValue: string) => void;
  deleteRow: () => void;
}

export const CoordinatesInput = ({ range, set, onCoordinateInputChange, deleteRow }: CoordinatesInputProps) => {

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
        <div className='d-flex flex-row justify-content-between'>
          <div className='d-flex flex-row align-items-center'>
            <input type='text'
              onBlur={(e) => onCoordinateInputChange('elevation', 'start', e.target.value)}
              className="text-field w-25" />
            <div className='pe-2 ps-2'>-</div>
            <input type='text'
              onBlur={(e) => onCoordinateInputChange('elevation', 'end', e.target.value)}
              className="text-field w-25" />
            <div className='text-field-emphasis ps-2'>m</div>
          </div>
          <button type='button' className='plus-button d-flex align-self-center right-0' onClick={(e) => deleteRow()}>
            <div>-</div>
          </button>
        </div>
      </div>
    </div>
  )
}