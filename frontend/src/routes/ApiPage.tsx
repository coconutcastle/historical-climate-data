import { useState } from "react";

export default function ApiPage() {

  const [downloadFormat, setDownloadFormat] = useState<'csv' | 'json'>('csv');

  return (
    <div className="data-content" style={{ height: '100vh' }} >
      <div className='title'>
        Historical Precipitation Data Explorer
      </div>
      <hr style={{ width: "100%" }} />
      <div className="d-flex flex-row" style={{ height: "85%" }}>
        <div className="plain-section w-100" style={{ overflow: 'auto' }}>
          <div className='heading-1'>
            API
          </div>
          <div className='heading-2'>
            Parameters
          </div>
        </div>
        <div className="d-flex flex-column w-100 ms-3">
          <div className="text-area">

          </div>
          <div className="d-flex flex-row mx-auto">
            <div className="mt-2">Download as</div>
            <select className="mt-2 ms-2" value={downloadFormat} onChange={(e: any) => setDownloadFormat(e.target.value)}>
              <option value='csv'>CSV</option>
              <option value='json'>JSON</option>
            </select>
          </div>
          <button className='med-button mx-auto'>
            <div className='med-button-text'>
              DOWNLOAD
            </div>
            <i className='material-icons'>play_arrow</i>
          </button>
        </div>
      </div>

    </div>
  )
}