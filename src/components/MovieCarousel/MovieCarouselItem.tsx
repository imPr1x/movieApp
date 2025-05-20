import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getMovieReviewsCount } from '@/services/movies/getMovieReviewsCount';
import Config from '@/config';
import { IMovieDetail } from '@/types/movie';

interface Props {
  movie: IMovieDetail;
}

const MovieCarouselItem: React.FC<Props> = ({ movie }) => {
  const [reviewCount, setReviewCount] = useState<number>(0);

  useEffect(() => {
    getMovieReviewsCount(movie.id).then(setReviewCount);
  }, [movie.id]);

  return (
    <div className="w-48 flex-shrink-0">
      <Link href={`/movie/${movie.id}`} className="block">
        <div className="relative">
          <div className="aspect-[2/3] rounded-lg overflow-hidden bg-white shadow-md">
            {movie.poster_path ? (
              <Image
                src={`${Config.IMAGE_SOURCE}${movie.poster_path}`}
                alt={movie.title}
                width={300}
                height={450}
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

      <div className="mt-1 px-1 flex justify-end">
        <div className="flex items-center gap-2 bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
          <span>{movie.vote_average.toFixed(1)}</span>
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.782 1.402 8.178L12 18.896l-7.336 3.875 1.402-8.178L.132 9.211l8.2-1.193z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default MovieCarouselItem;
