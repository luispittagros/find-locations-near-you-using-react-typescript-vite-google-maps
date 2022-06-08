import { useEffect, useState } from 'react';
import { fetchBoutiques, fetchFakeBoutiques } from '@/api/boutiques';

const useNearbyBoutiques = (
  userPosition: UserPosition | undefined,
  distance = 100,
): [Boutique[] | undefined, boolean] => {
  const [data, setData] = useState<Boutique[] | undefined>();
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

    return calculateDistance(from, to) * 1000 <= distance;
  };

  useEffect(() => {
    if (!userPosition) return () => {};

    setLoading(true);

    //  fetchBoutiques()
    //   .then(({ data }) => {
    //     setBoutiques(data.filter(nearestBoutiques));
    //    })
    //    .finally(() => setLoading(false));

    fetchFakeBoutiques()
      .then(setData)
      .finally(() => setLoading(false));

    return () => setData([]);
  }, [userPosition]);

  useEffect(() => {
    if (!data) return () => {};

    setBoutiques(data.filter(nearestBoutiques));

    return () => setBoutiques([]);
  }, [data, distance]);

  return [boutiques, loading];
};

export default useNearbyBoutiques;
