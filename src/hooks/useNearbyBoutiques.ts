import { useEffect, useState } from 'react';
import { fetchBoutiques } from '@/api/boutiques';

const useNearbyBoutiques = (userPosition: UserPosition | undefined) => {
  const [boutiques, setBoutiques] = useState<Boutique[]>([]);
  const [loading, setLoading] = useState(false);

  const calculateDistance = (
    from: google.maps.LatLng,
    to: google.maps.LatLng,
  ): number => {
    return +(
      google.maps.geometry.spherical.computeDistanceBetween(from, to) / 1000
    ).toFixed(2);
  };

  const nearestBoutiques = (boutique: Boutique) => {
    if (!userPosition) return false;

    const { location } = boutique;

    const { lat, lon } = location;

    const from = new google.maps.LatLng(
      userPosition.latitude,
      userPosition.longitude,
    );

    const to = new google.maps.LatLng(lat, lon);

    return calculateDistance(from, to) * 1000 <= 2000;
  };

  useEffect(() => {
    if (!userPosition) return () => {};

    setLoading(true);

    fetchBoutiques()
      .then(({ data }) => {
        setBoutiques(data.filter(nearestBoutiques));
      })
      .finally(() => setLoading(false));

    return () => setBoutiques([]);
  }, [userPosition]);

  return [boutiques, loading];
};

export default useNearbyBoutiques;
