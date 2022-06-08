import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { FC, useCallback, useEffect, useState } from 'react';
import useGeoLocation from '@/hooks/useGeoLocation';

import '@/components/Map.scss';

interface MapProps {
  boutiques?: Boutique[];
}

const libraries = ['geometry'] as (
  | 'geometry'
  | 'drawing'
  | 'localContext'
  | 'places'
  | 'visualization'
)[];

const latLng = (latitude: number, longitude: number) =>
  new google.maps.LatLng(latitude, longitude);

const Map: FC<MapProps> = ({ boutiques }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GMAPS_API_KEY,
    libraries,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const [userPosition] = useGeoLocation();

  const center = userPosition
    ? latLng(51.45980531877249, -0.11264111622112359)
    : undefined;

  const onLoad = useCallback((m: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    m.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (!boutiques?.length || !map) return;

    const bounds = new window.google.maps.LatLngBounds();

    boutiques.forEach(({ location: { lat, lon } }) => {
      bounds.extend(latLng(lat, lon));
    });
  }, [boutiques, map]);

  if (!isLoaded) return <div>Loading map...</div>;

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
};

export default Map;
