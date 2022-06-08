import { FC } from 'react';
import useGeoLocation from '@/hooks/useGeoLocation';
import useNearbyBoutiques from '@/hooks/useNearbyBoutiques';
import Map from '@/components/Map';

const Boutiques: FC = () => {
  const [userPosition, supports] = useGeoLocation();
  const [boutiques, loading] = useNearbyBoutiques(userPosition);

  return <Map boutiques={boutiques} userPosition={userPosition} />;
};

export default Boutiques;
