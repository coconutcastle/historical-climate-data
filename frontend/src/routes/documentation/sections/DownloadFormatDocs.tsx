import { viewDisabledImg, viewEnabledImg, dateDisabledImg, dateEnabledImg, metadataImg, filesImg, previewtableImg } from '../images';
import imageAlts from './text/imageAlts.json';

export default function DownloadFormatDocs() {
  return (
    <div className="plain-section" style={{ width: '100%' }}>
      <div className='heading-1'>
        Download Format
      </div>
      <div className='mt-2'>
        The selectors in this section allow the user to format the data retrieved given the data parameters to a certain degree. Users can choose whether data points should be condensed with multiple columns or spread out into multiple rows, the date format, whether to include station metadata, and how files should be separated.
      </div>
      <div className='mt-2'>
        There is also a preview table available at the end where the user can get a preview of how their files will be formatted with sample data.
      </div>


      <div className="heading-2 mt-2">
        Monthly Data View
      </div>
      <div className='d-flex flex-column'>
        <img src={viewDisabledImg} alt={imageAlts['view-disabled']} className='doc-img' style={{ width: "30%" }}/>
        <div className='img-caption' style={{ marginBottom: "2rem" }}>{imageAlts['view-disabled']}</div>
        <img src={viewEnabledImg} alt={imageAlts['view-enabled']} className='doc-img' style={{ width: "30%" }}/>
        <div className='img-caption'>{imageAlts['view-enabled']}</div>
      </div>
      <div className='mt-2'>
        <b>Type: </b>Radios
        <p className='mt-2'><b>Options: </b>Condensed or Spread</p>
        <p className='mt-2'>
          This selector lets the user choose the format of monthly data, which covers Monthly Precipitation and Monthly Anomalies (both mm and percentages). The data can be either in condensed view or spread view. Condensed view is the default option and the CSV file downloaded will have rows indicating year and columns for each selected month. In spread view, there is a separate row for every montly data point. Condensed view will result in a wider CSV file, while spread will result in a longer one. This option is only available if the user has chosen at least one monthly data-type download in the Data Type filter.
        </p>
      </div>


      <div className="heading-2 mt-2">
        Date
      </div>
      <div className='d-flex flex-column'>
        <img src={dateDisabledImg} alt={imageAlts['date-disabled']} className='doc-img' style={{ width: "50%" }}/>
        <div className='img-caption' style={{ marginBottom: "2rem" }}>{imageAlts['date-disabled']}</div>
        <img src={dateEnabledImg} alt={imageAlts['date-enabled']} className='doc-img' style={{ width: "50%" }}/>
        <div className='img-caption'>{imageAlts['date-enabled']}</div>
      </div>
      <div className='mt-2'>
        <b>Type: </b>Radios and text box
        <p className='mt-2'><b>Options: </b>Combine year and month with custom date format or keep separate</p>
        <p className="mt-2">
          This selector is only available for monthly data in spread view format and can only be selected if these options have been set. By default, monthly data is returned in two fields in two separate columns: year and month in its full name. However, should it be desired, the year and month values for each data point can be put in a single column in a user-defined format. YYYY or yyyy is used to place the 4-digit year, and MM or mm for the numerical month. DD or dd can be used as a placeholder for the day and will be replaced by “01” in the formatted date.
        </p>
        <p className="mt-2"><b>Examples: </b></p>
        <ul>
          <li>"MM/DD/YYYY" with February 1999 will become "02/01/1999"</li>
          <li>“YYYY-mm” with March 1950 will become “1950-03”</li>
        </ul>
      </div>


      <div className="heading-2 mt-2">
        Insert Station Metadata
      </div>
      <div className='d-flex flex-column'>
        <img src={metadataImg} alt={imageAlts['metadata']} className='doc-img' style={{ width: "10%" }}/>
        <div className='img-caption'>{imageAlts['metadata']}</div>
      </div>
      <div className='mt-2'>
        <b>Type: </b>Checkbox
        <p className="mt-2">
          If "Station Metadata" is among the selected data types, the user can choose to insert the station metadata for each row in the data files in addition to just the station code as additional columns. This includes the formal station name, latitude, longitude, elevation, country, and region data, if they exist.
        </p>
      </div>


      <div className="heading-2 mt-2">
        Files
      </div>
      <div className='d-flex flex-column'>
        <img src={filesImg} alt={imageAlts['files']} className='doc-img' style={{ width: "50%" }}/>
        <div className='img-caption'>{imageAlts['files']}</div>
      </div>
      <div className='mt-2'>
        <b>Type: </b>Radios
        <p className='mt-2'><b>Options: </b>Concatenate station data or separate files per station</p>
        <p className="mt-2">
          Users may select if the files will be downloaded together or individually by station. By default, all station data is concatenated together greating one long CSV file, and there is a separate file for selected option in the Data Type filter. However, should a separate file for each station be preferred, the "Separate files per station" can be selected, which will create a zipped folder containing the station-separated files.
        </p>
      </div>


      <div className="heading-2 mt-2">
        Preview Table
      </div>
      <div className='d-flex flex-column'>
        <img src={previewtableImg} alt={imageAlts['previewtable']} className='doc-img' style={{ width: "50%" }}/>
        <div className='img-caption'>{imageAlts['previewtable']}</div>
      </div>
      <div className='mt-2'>
        This table offers a preview of how the data to be returned will be formatted given the user selections. Note that this table uses sample data which is in no way related to the actual data that is retrieved. There is a tabbed preview pane available for each selected option from the Data Type filter.
      </div>
    </div>
  )
}