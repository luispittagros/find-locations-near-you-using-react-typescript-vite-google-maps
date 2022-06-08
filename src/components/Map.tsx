import { GoogleMap, Marker } from '@react-google-maps/api';
import { FC, useCallback, useState } from 'react';

import '@/components/Map.scss';

interface MapProps {
  boutiques?: Boutique[];
  userPosition?: UserPosition;
}

const latLng = (latitude: number, longitude: number) =>
  new google.maps.LatLng(latitude, longitude);

const Map: FC<MapProps> = ({ boutiques, userPosition }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const center = userPosition
    ? latLng(userPosition.latitude, userPosition.longitude)
    : undefined;

  const onLoad = useCallback((m: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    m.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      id="map"
      zoom={10}
      center={center}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {boutiques?.map(({ _id: id, location: { lat, lon } }) => (
        <Marker key={id} position={latLng(lat, lon)} />
      ))}
    </GoogleMap>
  );
};

Map.defaultProps = {
  boutiques: [],
  userPosition: undefined,
};

export default Map;
