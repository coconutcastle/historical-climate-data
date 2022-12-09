import { useQuery } from 'react-query';
import { getAllStationMetadata } from '../GHCNMService';


export const LandingPage = () => {

  const { data, error, isLoading } = useQuery({
    queryKey: ['station'],
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    staleTime: Infinity,
    queryFn: () => getAllStationMetadata()
  });

  console.log(data)
  
  return (
    <div>
      hi
    </div>
  )
}