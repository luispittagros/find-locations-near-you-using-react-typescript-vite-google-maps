import { GoogleMap, Marker } from '@react-google-maps/api';
import { FC } from 'react';

import '@/components/Map.scss';

interface MapProps {
  boutiques?: Boutique[];
  userPosition?: UserPosition;
}

const Map: FC<MapProps> = ({ boutiques, userPosition }) => {
  if (!userPosition || !boutiques?.length) return null;

  const latLng = (latitude: number, longitude: number) =>
    new google.maps.LatLng(latitude, longitude);

  return (
    <GoogleMap
      id="map"
      zoom={10}
      center={latLng(userPosition.latitude, userPosition.longitude)}
    >
      {boutiques.map(({ _id: id, location: { lat, lon } }) => (
        <Marker key={id} position={latLng(lat, lon)} />
      ))}
    </GoogleMap>
  );
};

Map.defaultProps = {
  boutiques: undefined,
  userPosition: undefined,
};

export default Map;
