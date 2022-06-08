import Boutiques from '@/components/Boutiques';
import '@/views/Home.scss';
import useGeoLocation from '@/hooks/useGeoLocation';
import Select from 'react-select';
import { useState } from 'react';

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
  const [userPosition, supports] = useGeoLocation();
  const [selectedOption, setSelectedOption] = useState<{
    value: number;
    label: string;
  } | null>(options[2]);

  return (
    <div className="home">
      <h1>Boutiques Near You</h1>

      {!supports && (
        <p className="no-geo-support">
          Your browser does not support geolocation.
        </p>
      )}

      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        placeholder="Distance"
        className="distance-select"
      />

      <Boutiques userPosition={userPosition} distance={selectedOption?.value} />
    </div>
  );
};

export default Home;
