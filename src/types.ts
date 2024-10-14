export interface Anime {
  id: number;
  title: string;
  image_url: string;
  type: string;
  episodes: number;
}

export interface AnimeDetails extends Anime {
  synopsis: string;
  status: string;
  aired: {
    string: string;
  };
  rating: string;
  genres: {
    mal_id: number;
    name: string;
  }[];
}