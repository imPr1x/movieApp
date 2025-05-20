import Image from "next/image";
import Config from "@/config";

interface IMovieCard {
  title: string;
  voteAverage: number;
  posterPath: string;
  description: string;
}

const MovieCard: React.FC<IMovieCard> = ({
  title,
  voteAverage,
  posterPath,
  description,
}) => {
  const poster = Config.IMAGE_SOURCE + posterPath;

  return (
    <div className="h-full">
      <div className="h-full bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl">
        
        {/* Poster */}
        <Image
          src={poster}
          alt={title}
          width={300}
          height={450}
          className="w-full h-auto object-cover"
          unoptimized 
        />

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          
          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">{title}</h2>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">{description}</p>

          {/* Score Badge */}
          <div className="mt-auto flex justify-end">
            <div className="flex items-center gap-2 bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
              <span>{voteAverage.toFixed(1)}</span>
              <svg
                className="w-4 h-4 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.782 1.402 8.178L12 18.896l-7.336 3.875 1.402-8.178L.132 9.211l8.2-1.193z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
