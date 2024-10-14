import axios from 'axios';
import { Anime, AnimeDetails } from './types';

const JIKAN_API_URL = 'https://api.jikan.moe/v4';

export async function fetchTopAnime(): Promise<Anime[]> {
  try {
    const response = await axios.get(`${JIKAN_API_URL}/top/anime?limit=20`);
    return response.data.data.map((item: any) => ({
      id: item.mal_id,
      title: item.title,
      image_url: item.images.jpg.image_url,
      type: item.type,
      episodes: item.episodes,
    }));
  } catch (error) {
    console.error('Error fetching top anime:', error);
    return [];
  }
}

export async function fetchAnimeDetails(id: number): Promise<AnimeDetails | null> {
  try {
    const response = await axios.get(`${JIKAN_API_URL}/anime/${id}`);
    const data = response.data.data;
    return {
      id: data.mal_id,
      title: data.title,
      image_url: data.images.jpg.image_url,
      synopsis: data.synopsis,
      type: data.type,
      episodes: data.episodes,
      status: data.status,
      aired: data.aired,
      rating: data.rating,
      genres: data.genres,
    };
  } catch (error) {
    console.error('Error fetching anime details:', error);
    return null;
  }
}

export async function searchAnime(query: string): Promise<Anime[]> {
  try {
    const response = await axios.get(`${JIKAN_API_URL}/anime?q=${query}&limit=20`);
    return response.data.data.map((item: any) => ({
      id: item.mal_id,
      title: item.title,
      image_url: item.images.jpg.image_url,
      type: item.type,
      episodes: item.episodes,
    }));
  } catch (error) {
    console.error('Error searching anime:', error);
    return [];
  }
}