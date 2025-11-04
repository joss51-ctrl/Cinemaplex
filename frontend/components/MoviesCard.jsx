import { Link } from "react-router-dom";
import api from "../api/api";
import { category } from "../api/tmdb";

function MovieCard({ item, category: cat }) {
  const link = "/" + category[cat] + "/" + item.id;
  const background = item.poster_path
    ? api.w500image(item.poster_path)
    : "https://critics.io/img/movies/poster-placeholder.png";

  const renderStars = (rating) => {
    if (!rating || isNaN(rating)) return "N/A";
    const stars = Math.round((rating / 10) * 5);
    return (
      <div className="flex justify-center gap-1 text-yellow-400">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i}>{i < stars ? "★" : "☆"}</span>
        ))}
      </div>
    );
  };

  return (
    <Link to={link} className="group perspective block">
      <div className="relative w-full h-0 pt-[160%] transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-xl  bg-cover bg-center backface-hidden"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 rounded-xl"></div>
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black/20 to-transparent">
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-xl   bg-cover bg-center rotate-y-180 backface-hidden flex flex-col h-full overflow-hidden"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className="absolute inset-0 bg-black/80 "></div>

          <div className="relative z-10 p-4 text-white flex flex-col h-full">
            {/* Desc */}
            <div className="grow pr-2 scroll-style ">
              <p className="text-sm leading-relaxed">
                {item.overview || "No description available."}
              </p>
            </div>

            {/* Rating */}
            <div className="mt-auto pt-4 text-center">
              {renderStars(item.vote_average)}
              <p className="text-xs font-bold text-gray-300 mt-1">
                {item.vote_average
                  ? `${item.vote_average.toFixed(1)} / 10`
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Title */}
      <h3 className="mt-2  font-bold text-white text-sm">
        {item.title || item.name}
      </h3>
    </Link>
  );
}

export default MovieCard;
