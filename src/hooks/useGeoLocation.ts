import { useEffect, useState } from 'react';

const useGeoLocation = (): [UserPosition | undefined, boolean] => {
  const [supports, setSupports] = useState(false);
  const [position, setPosition] = useState<UserPosition | undefined>(undefined);

  useEffect(() => {
    setSupports('geolocation' in navigator);
  }, []);

  useEffect(() => {
    if (supports) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude, accuracy } }) => {
          setPosition({
            latitude,
            longitude,
            accuracy,
          });
        },
        console.log,
        options,
      );
    }
  }, [supports]);

  return [position, supports];
};

export default useGeoLocation;
