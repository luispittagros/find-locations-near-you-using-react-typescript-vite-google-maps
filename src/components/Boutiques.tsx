import { FC } from 'react';
import '@/components/Boutiques.scss';
import Loader from '@/components/Loader';

interface BoutiquesProps {
  boutiques?: Boutique[];
  loading: boolean;
  map: google.maps.Map | null;
}

const Boutiques: FC<BoutiquesProps> = ({ boutiques, loading, map }) => {
  if (loading) return <Loader />;

  if (!boutiques?.length)
    return (
      <div className="boutiques__not-found">
        Sorry, we didn&apos;t find boutiques near you.
      </div>
    );

  const handleClick = (location: Coordinates) => {
    if (!map) return;

    const { lat, lon } = location;

    map.panTo(new google.maps.LatLng(lat, lon));
    map.setZoom(15);
  };

  return (
    <div className="boutiques">
      <ul>
        {boutiques?.map(({ name, logo, distance = 10, location }) => (
          <li className="boutique" key={name}>
            <a onClick={() => handleClick(location)}>
              <div
                className="boutique__logo"
                style={{ backgroundImage: logo ? `url('${logo.url}')` : '' }}
              />

              <div className="boutique__info">
                <h3 className="boutique__name">{name}</h3>
                <span className="boutique__distance">
                  {distance * 0.001 >= 1
                    ? `${(distance * 0.001).toFixed(2)} km`
                    : `${distance} m`}
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

Boutiques.defaultProps = {
  boutiques: undefined,
};

export default Boutiques;
