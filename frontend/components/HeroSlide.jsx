import React, { useEffect, useState } from "react";
import tmdb, { movieType } from "../api/tmdb";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import Button, { SlideLeftButton, SlideRightButton } from "./Button";
import { FaStar } from "react-icons/fa";
import api from "../api/api";
import "swiper/swiper-bundle.css";

function HeroSlide() {
  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };

      try {
        const response = await tmdb.getMoviesList(movieType.popular, {
          params,
        });
        setMovieItems(response.results.slice(0, 12));
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, []);

  return (
    <div className="bg-black pb-20">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={0}
        autoplay={{ delay: 5000 }}
      >
        {movieItems.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <HeroSlideItem
                item={item}
                index={i}
                movieItems={movieItems}
                className={isActive ? "active" : ""}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

const HeroSlideItem = (props) => {
  const item = props.item;
  const background = api.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );

  const movieDate = new Date(item.release_date);
  const isMovieTitleLong = item.title.length > 30;
  const isOverviewLong = item.overview.length > 100;

  const poster = api.w500image(
    item.poster_path ? item.poster_path : item.backdrop_path
  );

  return (
    <div
      className="relative py-9 h-screen bg-cover bg-center flex items-center justify-center "
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/60 to-black z-0"></div>

      <div className="relative z-10 flex items-center justify-between w-[90%] h-full gap-10">
        {props.index > 0 && <SlideLeftButton />}

        <div className="flex flex-col gap-7 text-white max-w-[60%] ml-20">
          <h2
            className={
              isMovieTitleLong
                ? "text-5xl uppercase font-sans font-bold md:text-3xl"
                : "text-7xl uppercase font-sans font-bold md:text-3xl"
            }
          >
            {item.title}
          </h2>

          <div className="flex items-center gap-5 text-xl">
            <div className="flex items-center gap-2">
              <FaStar className="text-yellow-400" />
              <p>{item.vote_average.toFixed(1)}</p>
            </div>
            <span>|</span>
            <p className="font-bold">{movieDate.getFullYear()}</p>
          </div>

          <p className="font-serif font-extralight text-[clamp(0.9rem,1.3vw,1.1rem)] leading-relaxed">
            {isOverviewLong
              ? item.overview.slice(0, 300) + "..."
              : item.overview}
          </p>

          <div className="flex items-center gap-10 md:flex-col-reverse md:items-start">
            <Button text="View" id={item.id} />
          </div>
        </div>

        <div className="hidden md:flex justify-center items-center md:mr-10">
          <img
            src={poster}
            alt={item.title}
            className="rounded-2xl shadow-xl w-[300px] h-auto hover:scale-105 transition-transform duration-500 pr-20"
          />
        </div>

        {props.index !== props.movieItems.length - 1 && <SlideRightButton />}
      </div>
    </div>
  );
};
export default HeroSlide;
