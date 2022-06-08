import { useEffect, useRef, useState } from 'react';

const useGeoLocation = (): [UserPosition | undefined, boolean] => {
  const [supports, setSupports] = useState(false);

  const userPosition = useRef<UserPosition>();

  useEffect(() => {
    setSupports('geolocation' in navigator);
  }, []);

  useEffect(() => {
    if (supports) {
      const geo = navigator.geolocation;

      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      geo.getCurrentPosition(
        (position) => {
          userPosition.current = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
        },
        console.log,
        options,
      );
    }
  }, [supports]);

  return [userPosition.current, supports];
};

export default useGeoLocation;
