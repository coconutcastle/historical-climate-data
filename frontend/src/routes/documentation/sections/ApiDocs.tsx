import apiText from './text/apiDocsCode.json';

export default function ApiDocs() {
  return (
    <div className="plain-section" style={{ width: '100%' }}>
      <div className='heading-1'>
        API
      </div>
      <div className="heading-2 mt-2">
        API Endpoints
      </div>
      <div className="heading-3 mt-2">
        /station
      </div>
      <div className="mt-2">
        <p><b>Type: </b>GET</p>
        <p className="mt-2"><b>Description: </b>Retrieves the metadata of all stations in the database.</p>
        <p className="mt-2"><b>Parameters: </b>None</p>
        <p className="mt-2"><b>Return Type: </b>Object[]</p>
        <p className="mt-2"><b>Return Array Object: </b></p>
        <div className="code-block" style={{ whiteSpace: 'pre' }}>
          {`${apiText["station-type"]}`}
        </div>
        <p className="mt-2"><b>Return Array Object Example: </b></p>
        <div className="code-block" style={{ whiteSpace: 'pre' }}>
          {`${apiText["station-ex"]}`}
        </div>
      </div>
      <div className="heading-3 mt-2">
        /basic/station
      </div>
      <div className='mt-2'>
        <p><b>Type: </b>GET</p>
        <p className="mt-2"><b>Description: </b>Retrieves the unique station identifying code and name of all stations in the database.</p>
        <p className="mt-2"><b>Parameters: </b>None</p>
        <p className="mt-2"><b>Return Type: </b>Object[]</p>
        <p className="mt-2"><b>Return Array Object: </b></p>
        <div className="code-block" style={{ whiteSpace: 'pre' }}>
          {`${apiText["basic-station-type"]}`}
        </div>
        <p className="mt-2"><b>Return Array Object Example: </b></p>
        <div className="code-block" style={{ whiteSpace: 'pre' }}>
          {`${apiText["basic-station-ex"]}`}
        </div>
      </div>
      <div className="heading-3 mt-2">
        /countries
      </div>
      <div className='mt-2'>
        <p><b>Type: </b>GET</p>
        <p className="mt-2"><b>Description: </b>Retrieves all the countries with available station data, their unique 3-digit identifying code, and the list of supported regions within them.</p>
        <p className="mt-2"><b>Parameters: </b>None</p>
        <p className="mt-2"><b>Return Type: </b>Object[]</p>
        <p className="mt-2"><b>Return Array Object: </b></p>
        <div className="code-block" style={{ whiteSpace: 'pre' }}>
          {`${apiText["countries-type"]}`}
        </div>
        <p className="mt-2"><b>Return Array Object Example: </b></p>
        <div className="code-block" style={{ whiteSpace: 'pre' }}>
          {`${apiText["countries-ex"]}`}
        </div>
      </div>
      <div className="heading-3 mt-2">
        /regions
      </div>
      <div className='mt-2'>
        <p><b>Type: </b>GET</p>
        <p className="mt-2"><b>Description: </b>Retrieves all regions with available station data.</p>
        <p className="mt-2"><b>Parameters: </b>None</p>
        <p className="mt-2"><b>Return Type: </b>String[]</p>
        <p className="mt-2"><b>Return Array String Example: </b>"NW"</p>
      </div>
      <div className="heading-3 mt-2">
        /download
      </div>
      <div className='mt-2'>
        <p><b>Type: </b>GET</p>
        <p className="mt-2"><b>Description: </b>Retrieves any combination of monthly precipitation data, monthly anomaly data in millimetres, monthly anomaly data in percentages, annual cycles data, and station metadata. What station data is returned depends on user-inputted parameters. This is the endpoint used to retrieve download data for the Download page.</p>
        <div className='heading-4'>
          Parameters
        </div>

        {/* PARAM: BYSTATION */}
        <div className='heading-5 mt-2'>byStation</div>
        <div className='mt-2'>
          <p className="mt-2"><b>Type: </b>Boolean</p>
          <p className="mt-2"><b>Options: </b>True or False</p>
        </div>

        {/* PARAM: YEARS */}
        <div className='heading-5 mt-2'>Years</div>
        <div className='mt-2'>
          <p className="mt-2"><b>Type: </b>Object[]</p>
          <p className="mt-2"><b>Array Object: </b></p>
          <div className="code-block" style={{ whiteSpace: 'pre' }}>
            {`${apiText["download-param-type-years"]}`}
          </div>
          <p className="mt-2"><b>Example: </b></p>
          <div className="code-block" style={{ whiteSpace: 'pre' }}>
            {`${apiText["download-param-ex-years"]}`}
          </div>
        </div>

        {/* PARAM: MONTHS */}
        <div className='heading-5 mt-2'>months</div>
        <div className='mt-2'>
          <p className="mt-2"><b>Type: </b>String[]</p>
          <p className="mt-2"><b>Allowed Array Values: </b>january, february, march, april, may, june, july, august, september, october, november, december</p>
          <p className="mt-2"><b>Example: </b></p>
          <div className="code-block" style={{ whiteSpace: 'pre' }}>
            {`${apiText["download-param-ex-months"]}`}
          </div>
        </div>

        {/* PARAM: COUNTRIES */}
        <div className='heading-5 mt-2'>countries</div>
        <div className='mt-2'>
          <p className="mt-2"><b>Type: </b>Object[]</p>
          <p className="mt-2"><b>Array Object: </b></p>
          <div className="code-block" style={{ whiteSpace: 'pre' }}>
            {`${apiText["countries-type"]}`}
          </div>
          <p className="mt-2"><b>Example: </b></p>
          <div className="code-block" style={{ whiteSpace: 'pre' }}>
            {`${apiText["download-param-ex-countries"]}`}
          </div>
        </div>

        {/* PARAM: REGIONS */}
        <div className='heading-5 mt-2'>regions</div>
        <div className='mt-2'>
          <p className="mt-2"><b>Type: </b>String[]</p>
          <p className="mt-2"><b>Allowed Array Values: </b>Region Acronyms</p>
          <p className="mt-2"><b>Example: </b></p>
          <div className="code-block" style={{ whiteSpace: 'pre' }}>
            {`${apiText["download-param-ex-regions"]}`}
          </div>
        </div>

        {/* PARAM: COORDINATES */}
        <div className='heading-5 mt-2'>coordinates</div>
        <div className='mt-2'>
          <p className="mt-2"><b>Type: </b>Object[]</p>
          <p className="mt-2"><b>Array Object: </b></p>
          <div className="code-block" style={{ whiteSpace: 'pre' }}>
            {`${apiText["download-param-type-coordinates"]}`}
          </div>
          <p className="mt-2"><b>Example: </b></p>
          <div className="code-block" style={{ whiteSpace: 'pre' }}>
            {`${apiText["download-param-ex-coordinates"]}`}
          </div>
        </div>

        {/* PARAM: STATIONS */}
        <div className='heading-5 mt-2'>stations</div>
        <div className='mt-2'>
          <p className="mt-2"><b>Type: </b>Object[]</p>
          <p className="mt-2"><b>Array Object: </b></p>
          <div className="code-block" style={{ whiteSpace: 'pre' }}>
            {`${apiText["basic-station-type"]}`}
          </div>
          <p className="mt-2"><b>Example: </b></p>
          <div className="code-block" style={{ whiteSpace: 'pre' }}>
            {`${apiText["download-param-ex-stations"]}`}
          </div>
        </div>

        {/* PARAM: REGIONS */}
        <div className='heading-5 mt-2'>dataTypes</div>
        <div className='mt-2'>
          <p className="mt-2"><b>Type: </b>String[]</p>
          <p className="mt-2"><b>Allowed Array Values: </b> prcp, anom, anom_pcnt, cycles, stations</p>
          <p className="mt-2"><b>Example: </b></p>
          <div className="code-block" style={{ whiteSpace: 'pre' }}>
            {`${apiText["download-param-ex-dataTypes"]}`}
          </div>
        </div>

        {/* RETURN OBJECT */}
        <div className='heading-4'>
          Return Object
        </div>
        <div className='mt-2'>
          <p><b>Type: </b>Object[]</p>
          <p className="mt-2"><b>Return Object: </b></p>
          <div className="code-block" style={{ whiteSpace: 'pre' }}>
            {`${apiText["download-type"]}`}
          </div>
          <p className="mt-2"><b>Example: </b></p>
          <div className="code-block" style={{ whiteSpace: 'pre' }}>
            {`${apiText["download-ex"]}`}
          </div>
        </div>

      </div>
    </div>
  )
}