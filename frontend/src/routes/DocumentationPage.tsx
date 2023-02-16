
export default function DocumentationPage() {
  return (
    <div className="data-content" style={{ height: '100vh' }} >
      <div className='title'>
        Historical Precipitation Data Explorer
      </div>
      <hr style={{ width: "100%" }} />
      <div className="plain-section">
        <div className='heading-1'>
          Documentation
        </div>
        <div>
          This tool was built by Cecile Dai, a research assistant at the Indian Ocean World Center (IOWC) at McGill University.
        </div>
        <div className="heading-2 mt-2">
          Sources
        </div>
        <div>
          The code for this website is available on GitHub and uses data from The Global Historical Climatology Network Monthly (GHCN-M) Version 2 dataset created by the National Climatic Data Center (NCDC).
        </div>
        <div className="mt-3">
          <b>Github: </b>
          <a href="https://github.com/coconutcastle/historical-climate-data">
            https://github.com/coconutcastle/historical-climate-data
          </a>
        </div>
        <div className="mt-2">
          <b>Download Data: </b>
          <a href="https://www.ncei.noaa.gov/products/land-based-station/global-historical-climatology-network-monthly">
            https://www.ncei.noaa.gov/products/land-based-station/global-historical-climatology-network-monthly
          </a>
        </div>
        <div className="mt-2">
          <b>Data Documentation: </b>
          <a href="https://www.ncei.noaa.gov/access/metadata/landing-page/bin/iso?id=gov.noaa.ncdc:C00835">
            https://www.ncei.noaa.gov/access/metadata/landing-page/bin/iso?id=gov.noaa.ncdc:C00835
          </a>
        </div>
        <div className="mt-3">
          The data can alternatively be downloaded and visualized using the World Meteorological Organization and
          Royal Netherlands Meteorological Institute's Climate Explorer Tool.
        </div>
        <div className="mt-2">
          <b>KNMI Climate Explorer: </b>
          <a href="https://climexp.knmi.nl/start.cgi?id=someone@somewhere">
            https://climexp.knmi.nl/start.cgi?id=someone@somewhere
          </a>
        </div>
      </div>
    </div>
  )
}