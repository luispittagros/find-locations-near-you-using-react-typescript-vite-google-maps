import { GoogleMap, Marker } from '@react-google-maps/api';
import { FC, useCallback, useEffect, useState } from 'react';
import useGeoLocation from '@/hooks/useGeoLocation';

import '@/components/Map.scss';
import Loader from '@/components/Loader';

interface MapProps {
  boutiques?: Boutique[];
  isLoaded: boolean;
}

const Map: FC<MapProps> = ({ boutiques, isLoaded = false }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState<
    google.maps.LatLng | google.maps.LatLngLiteral | undefined
  >(undefined);
  const [userPosition] = useGeoLocation();

  useEffect(() => {
    if (!userPosition || !isLoaded) return;

    setCenter(
      new google.maps.LatLng(userPosition.latitude, userPosition.longitude),
    );
  }, [isLoaded]);

  const onLoad = useCallback(
    (m: google.maps.Map) => {
      const bounds = new window.google.maps.LatLngBounds(center);
      m.fitBounds(bounds);
      setMap(map);
    },
    [center],
  );

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (!boutiques?.length || !map) return;

    const bounds = new window.google.maps.LatLngBounds();

    boutiques.forEach(({ location: { lat, lon } }) => {
      bounds.extend(new google.maps.LatLng(lat, lon));
    });
  }, [boutiques, map]);

  if (!isLoaded) return <Loader />;

  return (
    <GoogleMap
      id="map"
      zoom={10}
      center={center}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {boutiques?.map(({ _id: id, location: { lat, lon } }) => (
        <Marker key={id} position={new google.maps.LatLng(lat, lon)} />
      ))}
    </GoogleMap>
  );
};

Map.defaultProps = {
  boutiques: [],
};

export default Map;
