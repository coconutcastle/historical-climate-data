import { ParamsSection } from "./ParamsSection"
import { SelectionSection } from "./SelectionSection";
import { FormatSection } from "./FormatSection";

export default function DownloadPage() {
  return (
    <div className="data-content">
      <div className='title'>
        Historical Precipitation Data Explorer
      </div>
      <hr style={{ width: "100%" }} />
      <div className="d-flex flex-row align-items-start">
        <div className='params-format-wrapper'>
          <ParamsSection />
          <FormatSection />
        </div>

        <SelectionSection />
      </div>
    </div>
  )
}