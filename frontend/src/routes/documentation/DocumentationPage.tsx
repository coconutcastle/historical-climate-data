import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AboutDocs from './sections/AboutDocs';
import DownloadParamsDocs from './sections/DownloadParamsDocs';
import DownloadFormatDocs from './sections/DownloadFormatDocs';
import ApiDocs from './sections/ApiDocs';
import { DocumentationMenu } from './DocumentationMenu';
import { documentationSection } from '../../common/constants';

export default function DocumentationPage() {

  const location = useLocation();

  const [section, setSection] = useState<documentationSection>('about');

  const renderSubPage = () => {
    switch(section) {
      case 'about':
        return <AboutDocs />
      case 'params':
        return <DownloadParamsDocs />
      case 'format':
        return <DownloadFormatDocs />
      case 'api':
        return <ApiDocs />
      default:
        return <AboutDocs />
    }
  }

  useEffect(() => {
    const urlPieces: string[] = (location.pathname).split('/');
    const loc = urlPieces.at(-1);
    if (loc && ['about', 'params', 'format', 'api'].includes(loc)) {
      setSection(loc as documentationSection);
    };
  }, [location])


  return (
    <div className="data-content" style={{ height: section === 'about' ? "100vh" : "100%" }}>
      <div className='title'>
        Historical Precipitation Data Explorer
      </div>
      <hr style={{ width: "100%" }} />
      <div className='d-flex flex-row align-items-start' style={{ width: '100%' }}>
        <DocumentationMenu />
        { renderSubPage() }
      </div>
    </div>
  )
}