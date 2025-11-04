import {
  FaPlus,
  FaChevronRight,
  FaChevronLeft,
  FaPlayCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSwiper } from "swiper/react";

const Button = (props) => {
  return (
    <Link
      className="bg-blue-950 rounded-lg px-16 py-3 font-bold font-sans uppercase text-white duration-200 hover:opacity-70"
      to={"/movie/" + props.id}
    >
      {props.text}
    </Link>
  );
};

export const WatchTrailerButton = ({onClick}) => {
  return (
    <button
      className="bg-blue-950 rounded-lg px-5 text-xl py-3 font-bold font-sans uppercase text-white duration-200 hover:opacity-70" onClick={() => onClick()}
    >
      Watch Trailer
    </button>
  );
}

export const WatchlistButton = (props) => {
  return (
    <button
      className="border-2 border-solid border-yellow rounded-3xl p-3 duration-200 hover:opacity-70"
      onClick={props.onClick ? () => props.onClick() : null}
    >
      <FaPlus />
    </button>
  );
};

export const SlideRightButton = () => {
  const swiper = useSwiper();

  return (
    <button
      className="bg-slate-800 rounded-[40%] p-4 duration-200 hover:opacity-70 absolute right-0 mr-4"
      onClick={() => swiper.slideNext()}
    >
      <FaChevronRight size={28} className="text-slate-300" />
    </button>
  );
};

export const SlideLeftButton = () => {
  const swiper = useSwiper();

  return (
    <button
      className="bg-slate-800 rounded-[40%] p-4 duration-200 hover:opacity-70 absolute left-0 "
      onClick={() => swiper.slidePrev()}
    >
      <FaChevronLeft size={28} className="text-slate-300"/>
    </button>
  );
};

export const ViewMoreButton = (props) => {
  return (
    <Link
      className="border border-solid text-md border-yellow text-yellow duration-200 px-5 rounded-3xl hover:opacity-80"
      to={`/${props.category}`}
    >
      View More
    </Link>
  );
};

export const LoadMoreButton = (props) => {
  return (
    <button
      className="border border-solid text-md border-yellow text-yellow duration-200 px-5 rounded-2xl hover:opacity-80 mt-5 py-2"
      onClick={props.onClick ? () => props.onClick() : null}
    >
      Load More
    </button>
  );
};

export const PlayButton = () => {
  return (
    <button className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[50%] scale-0 transition [transition-property:transform,box-shadow] duration-300 ease hover:translate-x-[-50%] hover:translate-y[-50%] hover:scale-100">
      <FaPlayCircle />
    </button>
  );
};

export default Button;
