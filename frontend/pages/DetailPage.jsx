import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../api/tmdb";
import api from "../api/api";
import { FaCircle, FaStar, FaUsers } from "react-icons/fa";
import { WatchlistButton, WatchTrailerButton } from "../components/Button";
import Modal from "../components/Modal";

function DetailPage() {
  const [open, setOpen] = useState(false);
  const { category, id } = useParams();
  const [item, setItem] = useState(null);
  const [director, setDirector] = useState(null);
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.detail(category, id, { params: {} });
      setItem(response);
    };
    getDetail();
  }, [category, id]);

  useEffect(() => {
    const getDirector = async () => {
      const response = await tmdbApi.credits(category, id);
      setDirector(response.crew.filter(({ job }) => job === "Director"));
    };
    getDirector();
  }, [category, id]);

  useEffect(() => {
    const getCasts = async () => {
      const response = await tmdbApi.credits(category, id);
      setCasts(response.cast.slice(0, 3));
    };
    getCasts();
  }, [category, id]);

  const setModalActive = async () => {
    const modal = document.querySelector("#modal");
    const trailer = document.querySelector("#trailer");
    const videos = await tmdbApi.getVideos(category, id);

    if (videos.results.length > 0) {
      const src = `https://www.youtube.com/embed/${videos.results[0].key}`;
      trailer.setAttribute("src", src);
    } else {
      modal.removeChild(modal.lastElementChild);
      modal.querySelector("#no-trailer").textContent = "TRAILER UNAVAILABLE";
    }
  };

  return (
    <main>
      {item && director && casts && (
        <section
          className="relative min-h-screen bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${api.originalImage(
              item.backdrop_path || item.poster_path
            )})`,
          }}
        >
          <div className="absolute inset-0 bg-black/70" />

          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-42 md:px-10 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-6xl items-center">
              {/* Poster */}
              <div className="flex justify-center">
                <img
                  className="rounded-2xl shadow-lg max-w-sm w-full "
                  src={api.originalImage(
                    item.poster_path || item.backdrop_path
                  )}
                  alt="Poster"
                />
              </div>

              {/* Info Section */}
              <div className="flex flex-col gap-6 text-white">
                <h2 className="text-5xl font-bold uppercase leading-tight md:text-3xl">
                  {item.title || item.name}
                </h2>

                {/* Genre & Year */}
                <div className="flex flex-wrap items-center gap-3 text-base font-medium">
                  {item.genres.slice(0, 3).map((g, i) => (
                    <span
                      key={i}
                      className="bg-blue-950 text-white px-3 py-1 rounded-full text-sm"
                    >
                      {g.name}
                    </span>
                  ))}
                  <span>|</span>
                  <span className="font-semibold">
                    {new Date(
                      item.release_date || item.first_air_date
                    ).getFullYear()}
                  </span>
                </div>

                {/* Director & Cast */}
                <div className="flex flex-col gap-3">
                  {category === "movie" && (
                    <div className="flex items-center gap-3">
                      <span className="uppercase bg-blue-950 px-3 py-1 rounded-lg text-sm font-semibold">
                        Director
                      </span>
                      <span className="font-medium">
                        {director[0]?.name || "Unknown"}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="uppercase bg-blue-950 px-3 py-1 rounded-lg text-sm font-semibold">
                      Casts
                    </span>
                    <span className="font-medium">
                      {casts.map((c, i) => (
                        <span key={i}>
                          {c.name}
                          {i < casts.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </span>
                  </div>
                </div>

                {/* Desc */}
                <p className="text-lg font-normal leading-relaxed max-w-prose">
                  {item.overview}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-6 mt-4">
                  <div className="flex items-center gap-2 text-yellow-300">
                    <FaStar size={20} />
                    <span className="font-semibold">
                      {item.vote_average.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-600">
                    <FaUsers size={20} />
                    <span className="font-semibold">
                      {item.popularity.toFixed(0)}
                    </span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-5 mt-8">
                  <WatchTrailerButton
                    onClick={() => {
                      setModalActive();
                      setOpen(true);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Modal Trailer */}
          <Modal open={open} onClose={() => setOpen(false)}>
            <iframe
              allowFullScreen
              id="trailer"
              className="rounded-xl"
              width="100%"
              height="500px"
              title="trailer"
            ></iframe>
          </Modal>
        </section>
      )}
    </main>
  );
}

export default DetailPage;
