import Boutiques from '@/components/Boutiques';
import useGeoLocation from '@/hooks/useGeoLocation';
import Select from 'react-select';
import { useState } from 'react';
import useNearbyBoutiques from '@/hooks/useNearbyBoutiques';
import Map from '@/components/Map';
import '@/views/Home.scss';

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

const Home = () => {
  const [selectedOption, setSelectedOption] = useState<{
    value: number;
    label: string;
  } | null>(options[2]);

  const [userPosition, supports] = useGeoLocation();

  const [boutiques, loading] = useNearbyBoutiques(
    userPosition,
    selectedOption?.value,
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

        <Boutiques boutiques={boutiques} loading={loading} />
      </aside>

      <main>
        <Map boutiques={boutiques} />
      </main>
    </div>
  );
};

export default Home;
