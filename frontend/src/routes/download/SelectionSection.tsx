import { ParamsFields } from "../../common/download.interface"
import { toTitleCase } from "../../common/helpers";

interface SelectionSectionProps {
  params: ParamsFields;
}

export const SelectionSection = ({ params }: SelectionSectionProps) => {

  const renderParams = (param: string): string => {
    var stringArray: string[] = []
    switch (param) {
      case 'years':
        const years = params[param].reduce((acc, curr) => {
          const range = curr.single !== null ? `${curr.single}` : `${curr.start ?? ''}-${curr.end ?? ''}`;
          return [...acc, range];
        }, stringArray);
        stringArray = years;
      default:
        console.log('bad type');
    }
    return stringArray.join(', ');
  }

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
          <div className='d-flex flex-row mb-2' key={index}>
            <div className='col-4'><b>{toTitleCase(param)}: </b></div>
            {/* {JSON.stringify(Object.values(params)[index])} */}
            {renderParams(param)}
          </div>
        ))}
      </div>

    </div>
  )
}