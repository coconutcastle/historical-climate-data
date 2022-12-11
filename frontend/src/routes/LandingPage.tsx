import { useQuery } from 'react-query';
import { getAllStationMetadata } from '../GHCNMService';
import { useNavigate } from 'react-router-dom';


export default function LandingPage() {

  // const { data, error, isLoading } = useQuery({
  //   queryKey: ['station'],
  //   refetchOnWindowFocus: false,
  //   refetchIntervalInBackground: false,
  //   staleTime: Infinity,
  //   queryFn: () => getAllStationMetadata()
  // });

  // console.log(data)

  const navigate = useNavigate();

  return (
    <div className="container">
      <div className='d-flex flex-column justify-content-center align-items-center'>
        <div className='title pt-5 mt-2'>
          Historical Precipitation Data Explorer
        </div>
        <hr style={{ width: '90%' }} />
        <div className='mb-3' style={{ fontSize: '16px' }}>
          View, subset, and visualize historical precipitation data from stations around the world.
        </div>
        <button className='big-button' onClick={() => navigate('/download')}>
          <div className='button-text'>
            DOWNLOAD DATA
          </div>
          <i className='material-icons'>play_arrow</i>
        </button>
        <button className='big-button' onClick={() => navigate('/visualize')}>
          <div className='button-text'>
            VISUALIZE DATA
          </div>
          <i className='material-icons'>play_arrow</i>
        </button>
        <div className='w-75 text-center mt-5 mb-2'>
          This site uses data from The Global Historical Climatology Network Monthly (GHCN-M) Version 2 dataset created by the National Climatic Data Center (NCDC). 
          Download links and documentation are available <a href=''>here</a>.
        </div>
        <div className='w-75 text-center'>
          Alternatively, the data can be subset and accessed through the World Meteorological Organization and 
          Royal Netherlands Meteorological Institute's <a href=''>Climate Explorer</a> tool.
        </div>
      </div>
    </div>
  )
}