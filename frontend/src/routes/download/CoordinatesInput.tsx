import { useState } from "react";
import { CoordinateRange, CoordinateRow } from "../../common/download.interface";

interface CoordinatesInputProps {
  coordinates: CoordinateRange[];
}

export const CoordinatesInput = ({ coordinates }: CoordinatesInputProps) => {

  const CoordintateInputRow = ( range: CoordinateRange ) => {
    return (
      <div className='d-flex flex-row'>
        <div className='col-4'>
          <div className='d-flex flex-row align-items-center'>
            <input type='text' className="text-field w-25" />
            <div className='pe-2 ps-2'>-</div>
            <input type='text' className="text-field w-25" />
            <div className='text-field-emphasis ps-2'>N</div>
          </div>
        </div>
        <div className='col-4'>
          <div className='d-flex flex-row align-items-center'>
            <input type='text' className="text-field w-25" />
            <div className='pe-2 ps-2'>-</div>
            <input type='text' className="text-field w-25" />
            <div className='text-field-emphasis ps-2'>E</div>
          </div>
        </div>
        <div className='col-4'>
          <div className='d-flex flex-row align-items-center'>
            <input type='text' className="text-field w-25" />
            <div className='pe-2 ps-2'>-</div>
            <input type='text' className="text-field w-25" />
            <div className='text-field-emphasis ps-2'>m</div>
            <button type='button' className='plus-button' onClick={() => void}>
              <div>-</div>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {coordinates.map((range: CoordinateRange, index) => (
        <CoordintateInputRow range={range} key={index} />
      ))}
    </>
  )
}