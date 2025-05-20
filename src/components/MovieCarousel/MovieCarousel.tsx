import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IMovieDetail } from '@/types/movie';
import MovieCarouselItem from './MovieCarouselItem';



export interface MovieCarouselProps {
  title: string;
  movies: IMovieDetail[];
  icon: React.ReactNode;
  filterType?: string;
  onFilterChange?: (filter: string) => void;
  currentFilter?: string;
  showFutureIndicator?: boolean;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({
  title,
  movies,
  icon
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {icon}
          <h2 className="text-2xl font-bold ml-2 text-gray-800">{title}</h2>
        </div>
      </div>

      <div className="relative group">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft className="text-gray-600" size={20} />
        </button>

        <div className="overflow-x-auto hide-scrollbar" ref={carouselRef}>
          <div className="flex space-x-6 pb-4" style={{ width: `${Math.max(100, movies.length * 15)}%` }}>
            {movies.map(movie => (
              <MovieCarouselItem key={movie.id} movie={movie} />
            ))}
          </div>
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="text-gray-600" size={20} />
        </button>
      </div>
    </div>
  );
};

export default MovieCarousel;
