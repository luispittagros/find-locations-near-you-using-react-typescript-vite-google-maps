import { useEffect, useState } from 'react';
import Boutiques from '@/components/Boutiques';
import useGeoLocation from '@/hooks/useGeoLocation';
import Select from 'react-select';
import useNearbyBoutiques from '@/hooks/useNearbyBoutiques';
import Map from '@/components/Map';
import '@/views/Home.scss';
import { fetchFakeBoutiques } from '@/api/boutiques';
import { useLoadScript } from '@react-google-maps/api';

const options = [
  { value: 100, label: '+100 m' },
  { value: 500, label: '+500 m' },
  { value: 2000, label: '+2 km' },
  { value: 5000, label: '+5 km' },
  { value: 20000, label: '+20 km' },
  { value: 50000, label: '+50 km' },
  { value: 100000, label: '+100 km' },
  { value: 200000, label: '+200 km' },
  { value: 500000, label: '+500 km' },
];

const libraries = ['geometry'] as (
  | 'geometry'
  | 'drawing'
  | 'localContext'
  | 'places'
  | 'visualization'
)[];

const Home = () => {
  const [selectedOption, setSelectedOption] = useState<{
    value: number;
    label: string;
  } | null>(options[2]);

  const [boutiques, setBoutiques] = useState<Boutique[] | undefined>();

  const [loading, setLoading] = useState(false);

  const [userPosition, supports] = useGeoLocation();

  useEffect(() => {
    setLoading(true);

    //  fetchBoutiques()
    //   .then(({ data }) => {
    //     setBoutiques(data.filter(nearestBoutiques));
    //    })
    //    .finally(() => setLoading(false));

    fetchFakeBoutiques()
      .then(setBoutiques)
      .finally(() => setLoading(false));

    return () => setBoutiques([]);
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GMAPS_API_KEY,
    libraries,
  });

  const nearByBoutiques = useNearbyBoutiques(
    boutiques,
    userPosition,
    selectedOption?.value,
    isLoaded,
  );

  return (
    <div className="home">
      <aside className="home__boutiques">
        <div className="home__boutiques-header">
          <h1>Boutiques Nearby</h1>

          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
            placeholder="Distance"
            className="home__distance-select"
          />

          {!supports && (
            <p className="home__no-geo-support">
              Your browser does not support geolocation.
            </p>
          )}
        </div>

        <Boutiques boutiques={nearByBoutiques} loading={loading} />
      </aside>

      <main>
        <Map boutiques={nearByBoutiques} isLoaded={isLoaded} />
      </main>
    </div>
  );
};

export default Home;
