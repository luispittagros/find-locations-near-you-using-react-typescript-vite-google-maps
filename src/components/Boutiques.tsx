import { FC } from 'react';
import useNearbyBoutiques from '@/hooks/useNearbyBoutiques';
import Map from '@/components/Map';
import { useLoadScript } from '@react-google-maps/api';
import '@/components/Boutiques.scss';

const libraries = ['geometry'] as (
  | 'geometry'
  | 'drawing'
  | 'localContext'
  | 'places'
  | 'visualization'
)[];

interface BoutiquesProps {
  userPosition?: UserPosition;
  distance?: number;
}

const Boutiques: FC<BoutiquesProps> = ({ userPosition, distance }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GMAPS_API_KEY,
    libraries,
  });

  const [boutiques, loading] = useNearbyBoutiques(userPosition, distance);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      {!boutiques?.length && !loading && (
        <p className="no-boutiques">No boutiques found near you</p>
      )}
      <Map boutiques={boutiques} userPosition={userPosition} />;
    </>
  );
};

Boutiques.defaultProps = {
  userPosition: undefined,
  distance: undefined,
};

export default Boutiques;
