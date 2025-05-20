import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IMovieDetail } from '@/types/movie';
import { getMovieReviewsCount } from "@/services/movies/getMovieReviewsCount";
import Link from 'next/link';
import Config from '@/config';

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
            {movies.map(movie => {
              const [reviewCount, setReviewCount] = useState<number>(0);

              useEffect(() => {
                getMovieReviewsCount(movie.id).then(setReviewCount);
              }, [movie.id]);

              return (
                <div key={movie.id} className="w-48 flex-shrink-0">
                  <Link href={`/movie/${movie.id}`} className="block">
                    <div className="relative">
                      <div className="aspect-[2/3] rounded-lg overflow-hidden bg-white shadow-md">
                        {movie.poster_path ? (
                          <img
                            src={`${Config.IMAGE_SOURCE}${movie.poster_path}`}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
                            No image
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-3 px-1">
                      <h3 className="font-medium text-gray-800 text-sm mb-1 truncate">{movie.title}</h3>
                      <p className="text-gray-500 text-xs">{reviewCount} Reviews</p>
                    </div>
                  </Link>

                  {/* Nuevo estilo de SCORE */}
                  <div className="mt-1 px-1 flex justify-end">
                    <div className="flex items-center gap-2 bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                      <span>{movie.vote_average.toFixed(1)}</span>
                      <svg
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.782 1.402 8.178L12 18.896l-7.336 3.875 1.402-8.178L.132 9.211l8.2-1.193z" />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
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
