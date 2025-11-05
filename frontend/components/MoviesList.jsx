import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import tmdbApi, { category } from "../api/tmdb";
import MoviesCard from "./MoviesCard";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";

function MovieList(props) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getList = async () => {
      let response = null;
      const params = {};

      if (props.type !== "similar") {
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(props.type, { params });
            break;
          case category.tv:
            response = await tmdbApi.getTvList(props.type, { params });
            break;
          default:
            break;
        }
      } else {
        response = await tmdbApi.similar(props.category, props.id);
      }
      setItems(response.results);
    };
    getList();
  }, []);

  return (
    <div>
      <Swiper 
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        grabCursor={true}
        spaceBetween={25}
        navigation
        slidesOffsetBefore={50} 
        slidesOffsetAfter={50}
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
          1440: { slidesPerView: 6 },
          
        }}
        className="font-medium"
        style={{
          "--swiper-navigation-color": "#4300FF", 
          "--swiper-navigation-size": "32px",
        }}
      > 
        {items.map((item, i) => (
          <SwiperSlide key={i} className="flex justify-center ">
            <MoviesCard item={item} category={props.category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default MovieList;
