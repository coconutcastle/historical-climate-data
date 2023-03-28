// import { useState } from 'react';
// import { DownloadParamsDocs } from './sections/DownloadParamsDoc';
// import { DownloadFormatDocs } from './sections/DownloadFormatDocs';
import { AboutDocs } from './sections/AboutDocs';

// import { documentationSection } from '../../common/constants';



export default function DocumentationPage() {

  // const [section, setSection] = useState<documentationSection>('about');

  return (
    <div className="data-content" style={{ height: '100vh' }} >
      <div className='title'>
        Historical Precipitation Data Explorer
      </div>
      <hr style={{ width: "100%" }} />
      <div className='d-flex flex-row align-items-start' style={{ width: '100%' }}>
        <div className='doc-menu me-auto'>
          hi
        </div>
        <AboutDocs />

      </div>
    </div>
  )
}