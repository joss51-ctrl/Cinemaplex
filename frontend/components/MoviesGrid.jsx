import React, { useCallback, useEffect, useState } from "react";
import MoviesCard from "./MoviesCard";
import { useNavigate, useParams } from "react-router-dom";
import tmdbApi, { movieType, tvType } from "../api/tmdb";
import { LoadMoreButton } from "./Button";
import { FaSearch } from "react-icons/fa";
import SearchBox from "./SearchBox";

const MoviesGridHeader = ({ category, keyword: initialKeyword, resultsCount }) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(initialKeyword || "");

  const searchMovie = useCallback(() => {
    if (keyword.trim().length > 0) {
      navigate(`/${category}/search/${keyword}`);
    }
  }, [keyword, category, navigate]);

  useEffect(() => {
    const handleEnter = (e) => {
      if (e.key === "Enter") searchMovie();
    };
    document.addEventListener("keyup", handleEnter);
    return () => {
      document.removeEventListener("keyup", handleEnter);
    };
  }, [keyword, searchMovie]);

  return (
    <div className="flex justify-between items-center w-full md:flex-col md:gap-4">
      
      <div className="flex items-center gap-3">
        <SearchBox
          type="text"
          placeholder="Search..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          className="p-3 rounded-full hover:bg-white/20 transition duration-300"
          onClick={searchMovie}
        >
          <FaSearch />
        </button>
      </div>

      {initialKeyword && (
        <h2 className="font-semibold text-lg md:text-center md:mt-3 md:pr-20 ">
          Search Results ({resultsCount})
        </h2>
      )}
    </div>
  );
};

function MoviesGrid({ category }) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const { keyword } = useParams();

  useEffect(() => {
    const getList = async () => {
      let response = null;

      if (!keyword) {
        const params = {};
        switch (category) {
          case "movie":
            response = await tmdbApi.getMoviesList(movieType.upcoming, {
              params,
            });
            break;
          case "tv":
            response = await tmdbApi.getTvList(tvType.popular, { params });
            break;
          default:
            console.warn("Category not found:", category);
            break;
        }
      } else {
        const params = { query: keyword };
        response = await tmdbApi.search(category, { params });
      }

      if (response) {
        setItems(response.results);
        setTotalPage(response.total_pages);
        setPage(1); 
      } else {
        setItems([]);
        setTotalPage(0);
      }
    };

    getList();
  }, [category, keyword]);

  const loadMore = async () => {
    let response = null;
    const params = { page: page + 1 }; 

    if (!keyword) {
      switch (category) {
        case "movie":
          response = await tmdbApi.getMoviesList(movieType.upcoming, {
            params,
          });
          break;
        case "tv":
          response = await tmdbApi.getTvList(tvType.popular, { params });
          break;
        default:
          break;
      }
    } else {
      params.query = keyword; 
      response = await tmdbApi.search(category, { params });
    }

    if (response && response.results) {
      setItems((prevItems) => [...prevItems, ...response.results]);
      setPage(page + 1);
    }
  };

  return (
    <div className="w-full flex flex-col items-start gap-10 ">
      <div className="text-amber-50">
        <MoviesGridHeader
          category={category}
          keyword={keyword}
          resultsCount={items.length} 
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full">
        {items.map((item, i) => (
          <MoviesCard category={category} item={item} key={i} />
        ))}
      </div>

      {page < totalPage && (
        <div className="mt-5 self-center text-blue-500 text-xl font-bold">
          <LoadMoreButton onClick={loadMore} />
        </div>
      )}
    </div>
  );
}

export default MoviesGrid;