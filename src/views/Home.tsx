import Map from '@/components/Map';
import { Wrapper } from '@googlemaps/react-wrapper';
import useGeoLocation from '@/hooks/useGeoLocation';
import useNearbyBoutiques from '@/hooks/useNearbyBoutiques';

const Home = () => {
  const [userPosition, supports] = useGeoLocation();
  const nearbyBoutiques = useNearbyBoutiques(userPosition);

  console.log(nearbyBoutiques);

  return (
    <Wrapper apiKey={import.meta.env.VITE_GMAPS_API_KEY}>
      <Map />
    </Wrapper>
  );
};

export default Home;
