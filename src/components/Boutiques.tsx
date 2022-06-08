import { FC } from 'react';
import '@/components/Boutiques.scss';
import Loader from '@/components/Loader';

interface BoutiquesProps {
  boutiques?: Boutique[];
  loading: boolean;
}

const Boutiques: FC<BoutiquesProps> = ({ boutiques, loading = false }) => {
  if (loading) return <Loader />;

  if (!boutiques?.length)
    return (
      <div className="boutiques__not-found">
        Sorry, we didn&apos;t find boutiques near you.
      </div>
    );

  return (
    <div className="boutiques">
      <ul>
        {boutiques?.map(({ name, logo, distance = 10 }) => (
          <li className="boutique" key={name}>
            <div
              className="boutique__logo"
              style={{ backgroundImage: logo ? `url('${logo.url}')` : '' }}
            />

            <div className="boutique__info">
              <h3 className="boutique__name">{name}</h3>
              <span className="boutique__distance">{distance} km</span>
            </div>
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
