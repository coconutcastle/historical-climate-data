import { ParamsSection } from "./ParamsSection"
import { SelectionSection } from "./SelectionSection";
import { FormatSection } from "./FormatSection";
import { useState } from "react";
import { ParamsFields } from "../../common/download.interface";

export default function DownloadPage() {

  const [params, setParams] = useState<ParamsFields>({
    years: [],
    months: [],
    countries: [],
    regions: [],
    latitude: [],
    longitude: [],
    elevation: [],
    station: [],
    dataTypes: []
  });

  return (
    <div className="data-content">
      <div className='title'>
        Historical Precipitation Data Explorer
      </div>
      <hr style={{ width: "100%" }} />
      <div className="d-flex flex-row align-items-start">
        <div className='params-format-wrapper'>
          <ParamsSection 
          params={params} 
          onParamsChanged={(newParams: ParamsFields) => setParams(newParams)}
          />
          <FormatSection />
        </div>
        <SelectionSection />
      </div>
    </div>
  )
}