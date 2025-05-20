import { useState, useEffect, useCallback } from 'react';
import api from '@/services/api';
import { IMovieDetail } from '@/types/movie';

export const useMoviesData = () => {
  const [trendingMovies, setTrendingMovies] = useState<IMovieDetail[]>([]);
  const [discoverActionMovies, setDiscoverActionMovies] = useState<IMovieDetail[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<IMovieDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [trendingTimeWindow, setTrendingTimeWindow] = useState<'day' | 'week'>('day');

  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);

      const trendingResponse = await api.get(`/trending/movie/${trendingTimeWindow}`, {
        params: {
          language: "en-US",
          page: 1
        }
      });

      const discoverResponse = await api.get('/discover/movie', {
        params: {
          language: "en-US",
          with_genres: 10751,
          sort_by: "vote_count.desc",
          page: 1
        }
      });

      const topRatedResponse = await api.get('/movie/top_rated', {
        params: {
          language: "en-US",
          page: 1
        }
      });

      setTrendingMovies(trendingResponse.data.results.slice(0, 8));
      setDiscoverActionMovies(discoverResponse.data.results.slice(0, 8));
      setTopRatedMovies(topRatedResponse.data.results.slice(0, 8));

      setError(null);
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError("Could not load movies");
    } finally {
      setLoading(false);
    }
  }, [trendingTimeWindow]);

  useEffect(() => {
    fetchMovies();

    const intervalId = setInterval(() => {
      fetchMovies();
    }, 24 * 60 * 60 * 1000); // cada 24 horas

    return () => clearInterval(intervalId);
  }, [fetchMovies]);

  return {
    trendingMovies,
    discoverActionMovies,
    topRatedMovies,
    loading,
    error,
    trendingTimeWindow,
    setTrendingTimeWindow
  };
};
