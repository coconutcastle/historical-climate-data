import { yearsImg, monthsImg, coordinatesImg, countriesImg, stationsImg, datatypesImg } from '../images';
import imageAlts from './text/imageAlts.json'; 

export default function DownloadParamsDocs() {
  return (
    <div className="plain-section" style={{ width: '100%' }}>
      <div className='heading-1'>
        Download Parameters
      </div>


      <div className="heading-2 mt-2">
        Temporal Filters
      </div>


      <div className="heading-3 mt-2">
        Years
      </div>
      <div className='d-flex flex-column'>
        <img src={yearsImg} alt={imageAlts['years']} className='doc-img' style={{ width: "30%" }} />
        <div className='img-caption'>{imageAlts['years']}</div>
      </div>
      <div className="mt-2">
        <b>Type: </b>Text Field
        <p className="mt-2">
          This filter allows the user to select the ranges of years for which they want data.
        </p>
        <p className="mt-2">There are five ways to enter range information:</p>
        <ul>
          <li><b>Lower Bound - Upper Bound: </b>Retrieve data for stations between the lower and upper bound. The upper bound must be greater than the lower bound.</li>
          <li><b>Lower Bound - : </b>Retrieve data for stations above the lower bound.</li>
          <li><b>- Upper Bound: </b>Retrieve data for stations below the upper bound.</li>
          <li><b>Single Year: </b>Retrieve data for a single year.</li>
          <li><b>Leave it Blank: </b>This particular filter will not be used. Ex: Leaving the Altitude filter blank means that altitude is not used as a filtration criteria. Therefore, data from stations at any altitude are returned.</li>
        </ul>
        Multiple year ranges can be added and should be separated by commas. With multiple ranges, data from each will be returned.
        <p className="mt-2"><b>Examples: </b></p>
        <ul>
          <li><b>"1912 - 1930, 1940 - 1945" </b>will return data from all years between 1912 to 1930, inclusive, as well as data from between 1940 to 1945.</li>
          <li><b>"1870, 2000 - " </b>will return data from the year 1870 and after 2000.</li>
        </ul>
      </div>


      <div className="heading-3 mt-2">
        Months
      </div>
      <div className='d-flex flex-column'>
        <img src={monthsImg} alt={imageAlts['months']} className='doc-img' style={{ width: "50%" }}/>
        <div className='img-caption'>{imageAlts['months']}</div>
      </div>
      <div className="mt-2">
        <b>Type: </b>Checkbox array
        <p className="mt-2">
          This allows the user to select the months for which they want data for. The monthly data columns in the data returned will be in the order in which the months were selected. To ensure the order is correct, refer to the list of months in the Parameters tab to the right. If no months are selected, data is returned for all the months in standard January - December order.
        </p>
      </div>


      <div className="heading-2 mt-2">
        Location Filters
      </div>
      <p>
        These filters let the user select a politically defined region and/or a coordinate range from which to retrieve station data. If either of these filters are left blank, they will not be used to filter stations. If not, then data will be returned for stations both in these countries/regions as well as in the specified coordinate ranges.
      </p>
      

      <div className="heading-3 mt-2">
        Countries
      </div>
      <div className='d-flex flex-column'>
        <img src={countriesImg} alt={imageAlts['countries']} className='doc-img' style={{ width: "20%" }}/>
        <div className='img-caption'>{imageAlts['countries']}</div>
      </div>
      <div className="mt-2">
        <b>Type: </b>Autocomplete multiselect
        <p className="mt-2">
          This allows the user to select the countries from which they would like to retrieve station data from. Each country is indentified by a unique 3-digit code, but there are duplicates for some. There may be more than one code per country. The searchable countries using this filter are unique per code, so to ensure that you include all the stations from the desired country, search up the country by name and add all available entires.
        </p>
      </div>


      <div className="heading-3 mt-2">
        Regions
      </div>
      <div className='d-flex flex-column'>
        <img src={countriesImg} alt={imageAlts['regions']} className='doc-img' style={{ width: "20%" }}/>
        <div className='img-caption'>{imageAlts['regions']}</div>
      </div>
      <div className="mt-2">
        <b>Type: </b>Autocomplete multiselect
        <p className="mt-2">
          This allows the user to select a specific administrative region to retrieve station data from. If at least one country has also been seleted, the regions displayed using this filter will be limited to the regions per those specific countries and data will be returned for stations in the selected regions only and not the rest of the country. Region specifications are not available for every station or country and depend on the naming conventions of the specific area's stations.
        </p>
        <p className="mt-2"><b>List of countries with available region specifications: </b></p>
        <ul>
          <li>Canada</li>
          <li>India</li>
          <li>Australia</li>
        </ul>
      </div>


      <div className="heading-3 mt-2">
        Coordinate Range
      </div>
      <div className='d-flex flex-column'>
        <img src={coordinatesImg} alt={imageAlts['coordinates']} className='doc-img' style={{ width: "60%" }}/>
        <div className='img-caption'>{imageAlts['coordinates']}</div>
      </div>
      <div className="mt-2">
        Allows the user to define an area for which they want to retreive station data from. Stations can be filtered by latitude, longitude, and altitude range. 
        <p className="mt-2">For each filter, there are 4 ways in which you can enter range information:</p>
        <ul>
          <li><b>Lower Bound - Upper Bound: </b>Retrieves data for stations between the lower and upper bound. The upper bound must be greater than the lower bound.</li>
          <li><b>Lower Bound - : </b>Retrieves data for stations above the lower bound.</li>
          <li><b>- Upper Bound: </b>Retrieves data for stations below the upper bound.</li>
          <li>
            <b>Leave it Blank: </b>This particular filter will not be used. For example, leaving the altitude filter blank means that altitude is not used as a filtration criteria. Therefore, data from stations at any altitude are returned.
          </li>
        </ul>
        <p>
          The bounds on the ranges are inclusive, so filter results will include the bound themselves.
        </p>
        <p className="mt-2">
          <b>Example: </b>Latitude: 30 - 40 will return data from stations between latitude 30 and 40 including stations at latitude 30 and 40.
        </p>
        <p className="mt-2">
          Within a single line, data from stations at the intersection of the non-blank ranges will be returned.
        </p>
        <p className="mt-2">
          <b>Example: </b>Longitude: 0 - 10 and Altitude: 0 -  will use stations within the longitude range 0 - 10 AND above an altitude of 0 m.
        </p>
        <p className="mt-2">
          You can add another coordinate range line using the (+) button. When there is more than one coordinate range, data from stations at the union of these ranges is returned.
        </p>
        <p className="mt-2">
          <b>Example: </b>The first range is Latitude: 0 - 5 and Longitude: - 10, while the second is Longitude: 90 - . This will return data within the latitude 0 - 5 and longitude -180 - 10 coordinate range, as well as data above longitude 90.
        </p>
        <p className="mt-2">
          Remove unecessary ranges by pressing the (-) button next to the coordinate range line.
        </p>
      </div>

      <div className="heading-4 mt-2">
        Latitude
      </div>
      <div className="mt-2">
        <p><b>Type: </b>Custom text field</p>
        <p className="mt-2"><b>Units: </b>Degrees North, Decimal Degrees</p>
        <p className="mt-2"><b>Range: </b>-90 to +90</p>
      </div>

      <div className="heading-4 mt-2">
        Longitude
      </div>
      <div className="mt-2">
        <p><b>Type: </b>Custom text field</p>
        <p className="mt-2"><b>Units: </b>Degrees East, Decimal Degrees</p>
        <p className="mt-2"><b>Range: </b>-180 to +180</p>
      </div>

      <div className="heading-4 mt-2">
        Altitude
      </div>
      <div className="mt-2">
        <p><b>Type: </b>Custom text field</p>
        <p className="mt-2"><b>Units: </b>Meters (m) above sea level</p>
        <p className="mt-2"><b>Range: </b>-90 to +90</p>
        <p className="mt-2">
          Not every station has altitude information, so using this filter may mean that some stations that were perhaps within the altitude range but did not have it listed are excluded.
        </p>
      </div>


      <div className="heading-2 mt-2">
        Stations
      </div>
      <div className='d-flex flex-column'>
        <img src={stationsImg} alt={imageAlts['stations']} className='doc-img' style={{ width: "30%" }}/>
        <div className='img-caption'>{imageAlts['stations']}</div>
      </div>
      <div className="mt-2">
        <b>Type: </b>Autocomplete multiselect
        <p className="mt-2">
          While not every station has a name, they are all identified by a unique 6-digit code that may or may not have additional decimal points to indicate non-trivial duplication. If the user knows the name or code, they can add specific stations to retrieve data from. If filled in in addition to other filters, data will be retrieved from the stations specified here in as well as the stations in the coordinate ranges and/or in the selected countries/regions.
        </p>
      </div>


      <div className="heading-2 mt-2">
        Data Types
      </div>
      <div className='d-flex flex-column'>
        <img src={datatypesImg} alt={imageAlts['datatypes']} className='doc-img' style={{ width: "70%" }}/>
        <div className='img-caption'>{imageAlts['datatypes']}</div>
      </div>
      <div className='mt-2'>
        <b>Type: </b>Checkbox array
        <p className='mt-2'>There are 5 types of data available for download from the stations within the user selections:</p>
        <ul>
          <li>
            <b>Monthly Precipitation: </b>The precipitation records in millimetres for each month and year for which there is data at each respective station.
          </li>
          <li>
            <b>Monthly Anomalies (mm): </b>The anomalies in millimetres for each month in terms of that month's deviation from its respective station's average precipitation for each calendar month.
          </li>
          <li>
            <b>Monthly Anomalies (percentages)</b>The anomalies in percentages for each month in terms of that month's deviation from its respective station's average precipitation for each calendar month. These values are equivalent to the percentage difference between each month's precipitation recording and the station's monthly average.
          </li>
          <li>
            <b>Statistis Per Month/Annual Cycles: </b>The station's average precipitation records for each calendar month. These are the numbers compared against when calculating monthly anomalies.
          </li>
          <li>
            <b>Station Metadata: </b>The metadata for each station within the user's selection criteria. This contains the station code, name, region, country, latitude, longitude, and elevation, if available.
          </li>
        </ul>
        <p>Multiple may be selected.</p>
      </div>
    </div>
  )
}