interface Boutique {
  _id: string;
  name: string;
  slug: string;
  location: Coordinates;
  description: string;
  founder_quote: string;
  logo?: BoutiqueLogo;
}

type BoutiqueLogo = {
  url: string;
};

type Coordinates = {
  lon: number;
  lat: number;
};
