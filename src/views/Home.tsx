import { useLoadScript } from '@react-google-maps/api';
import Boutiques from '@/components/Boutiques';

const libraries = ['geometry'] as (
  | 'geometry'
  | 'drawing'
  | 'localContext'
  | 'places'
  | 'visualization'
)[];

const Home = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GMAPS_API_KEY,
    libraries,
  });

  return isLoaded && <Boutiques />;
};

export default Home;
