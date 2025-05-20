'use client'
import { Star, TrendingUp, Film } from 'lucide-react';
import { useMoviesData } from "@/hooks/useMoviesData";
import MovieCarousel from "../MovieCarousel/MovieCarousel";

const Home = () => {
  const { 
    trendingMovies, 
    discoverActionMovies, 
    topRatedMovies, 
    loading, 
    error, 
    trendingTimeWindow, 
    setTrendingTimeWindow 
  } = useMoviesData();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-800">
      <div className="container mx-auto px-4 py-8">


        <MovieCarousel 
          title="Top Rated" 
          movies={topRatedMovies}
          icon={<Star className="text-yellow-500" size={24} />}
        />

        <MovieCarousel 
          title="Trending" 
          movies={trendingMovies}
          icon={<TrendingUp className="text-red-500" size={24} />}
          filterType="trending"
          onFilterChange={(filter) => setTrendingTimeWindow(filter as 'day' | 'week')}
          currentFilter={trendingTimeWindow}
        />
        
        <MovieCarousel 
          title="For family movies" 
          movies={discoverActionMovies}
          icon={<Film className="text-blue-500" size={24} />}
        />
        

      </div>
    </div>
  );
};


export default Home;