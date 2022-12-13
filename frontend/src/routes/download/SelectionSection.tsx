import { useCallback } from "react";
import { CoordinateRange, CountryInfo, ParamsFields, StationMetadataBasic, Range, DataTypeText } from "../../common/download.interface"
import { toTitleCase } from "../../common/helpers";

interface SelectionSectionProps {
  params: ParamsFields;
}

const getRangeString = (range: Range): string => {
  return range.single !== null ? `${range.single}` : `${range.start ?? ''}${range.start !== null && range.end !== null ? '-' : ''}${range.end ?? ''}`;
}

const coordinateUnits: Record<string, string> = {
  latitude: 'N',
  longitude: 'E',
  elevation: 'm'
}

const renderCoordinates = (coordinate: CoordinateRange, index: number) => {
  const rangeStrings = Object.keys(coordinate).map((bound: string) => {
    if (Object.values(coordinate[bound as keyof CoordinateRange]).some(val => val !== null)) {    // if all numbers for that bound is null, don't return a string
      return `${toTitleCase(bound === 'elevation' ? 'elev' : bound.slice(0, 3))}: ${getRangeString(coordinate[bound as keyof CoordinateRange])} ${coordinateUnits[bound]}`;
    }
  });
  const validRangeStrings = rangeStrings.filter(range => range !== undefined);  // only for bounds with non-empty ranges
  return validRangeStrings.length > 0 ? <div key={index}>{validRangeStrings.join(', ')}</div> : '';
}

export const SelectionSection = ({ params }: SelectionSectionProps) => {

  const renderParams = useCallback((param: string): string => {
    var stringArray: string[] = [];
    switch (param) {
      case 'years':
        stringArray = params.years.reduce((acc, curr) => {
          const range = getRangeString(curr);
          return [...acc, range];   // put all year ranges as strings in an array
        }, stringArray);
        break;
      case 'months':
        stringArray = params.months;
        break;
      case 'countries':
        stringArray = params.countries.map((country: CountryInfo) => toTitleCase(country.country));
        break;
      case 'regions':
        stringArray = params.regions.map((region: string) => region.length == 2 ? region : toTitleCase(region));
        break;
      case 'stations':
        stringArray = params.stations.map((station: StationMetadataBasic) => `(${station.code})${station.name === null ? '' : ' ' + toTitleCase(station.name)}`);
        break;
      case 'dataTypes':
        stringArray = params.dataTypes.map((data) => DataTypeText[data]);
        break;
      default:
        console.log('bad type');
    }
    return stringArray.join(', ');
  }, [params]);

  return (
    <div className="selection-section">
      <div className="heading-1">
        Selections
      </div>
      <div>
        The union of the selections will be returned.
      </div>
      <div className="heading-2 mt-4 mb-2">
        Parameters
      </div>
      <div className='d-flex flex-column'>
        {(Object.keys(params).filter((p: any) => params[p as keyof ParamsFields].length > 0)).map((param, index) => (
          <div className='d-flex flex-row mb-2 flex-wrap' key={index}>
            {param !== 'coordinates' ?
              <>
                <div className='col-4'><b>{toTitleCase(param)}: </b></div>
                {renderParams(param)}
              </> :
              <>
                {(params.coordinates.filter((coord: CoordinateRange) =>   // only render if there are non-empty coordinates
                  Object.values(coord.latitude).some(val => val !== null)
                  || Object.values(coord.longitude).some(val => val !== null)
                  || Object.values(coord.elevation).some(val => val !== null))).length === 0 ? '' :
                  (<>
                    <div className='col-4'><b>Coordinates: </b></div>
                    <div className='d-flex flex-column col-8'>
                      {params.coordinates.map((coord: CoordinateRange, index: number) => renderCoordinates(coord, index))}
                    </div>
                  </>)}
              </>
            }
          </div>
        ))}
      </div>
    </div>
  )
}