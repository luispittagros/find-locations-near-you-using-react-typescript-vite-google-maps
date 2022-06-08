import { useCallback, useEffect, useState } from 'react';

const useNearbyBoutiques = (
  boutiques: Boutique[] | undefined,
  userPosition: UserPosition | undefined,
  distance = 100,
  isMapLoaded = false,
): Boutique[] | undefined => {
  const [nearByBoutiques, setNearbyBoutiques] = useState<Boutique[]>([]);

  const calculateDistance = useCallback(
    (boutique: Boutique) => {
      if (!isMapLoaded || !userPosition) return boutique;

      const { lat, lon } = boutique.location;

      const from = new google.maps.LatLng(
        userPosition.latitude,
        userPosition.longitude,
      );

      const to = new google.maps.LatLng(lat, lon);

      const boutiqueDistance =
        +(
          google.maps.geometry.spherical.computeDistanceBetween(from, to) / 1000
        ).toFixed(2) * 1000;

      return {
        ...boutique,
        distance: boutiqueDistance,
      };
    },
    [distance, userPosition, isMapLoaded],
  );

  useEffect(() => {
    if (!boutiques) return () => {};

    const nearbyBoutiques = boutiques
      .map<Boutique>(calculateDistance)
      .filter((b) => b?.distance !== undefined && b.distance <= distance)
      .sort((a, b) => {
        if (a.distance !== undefined && b.distance !== undefined) {
          return a.distance - b.distance;
        }

        return -1;
      });
    // .slice(0, 4); Slice to get only 5 boutiques

    setNearbyBoutiques(nearbyBoutiques);

    return () => setNearbyBoutiques([]);
  }, [boutiques, userPosition, distance, isMapLoaded]);

  return nearByBoutiques;
};

export default useNearbyBoutiques;
