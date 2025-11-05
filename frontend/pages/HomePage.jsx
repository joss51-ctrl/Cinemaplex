import HeroSlide from "../components/HeroSlide";
import MovieList from "../components/MoviesList";
import { category, movieType, tvType } from "../api/tmdb";
import ScrollToTopButton from "../components/ScrollTop";

function HomePage() {

  return (
    <main>
      <HeroSlide />

      <div className="bg-linear-to-r from-black to-zinc-900 w-full flex flex-col gap-20 pb-16 text-amber-50">
        <div className="flex flex-col mx-32 gap-10">
          <div className="flex items-center justify-between md:flex-col md:items-start md:gap-3">
            <label className="py-5 text-3xl font-semibold uppercase md:text-2xl ">Movies</label>
          </div>
          <MovieList category={category.movie} type={movieType.popular} />
        </div>

        <div className="flex flex-col mx-32 gap-10">
          <div className="flex items-center justify-between md:flex-col md:items-start md:gap-3">
            <label className="text-3xl font-semibold uppercase md:text-2xl">Series</label>
          </div>
          <MovieList category={category.tv} type={tvType.popular} />
        </div>

        <div className="flex flex-col mx-32 gap-10">
          <div className="flex items-center justify-between md:flex-col md:items-start md:gap-3">
            <label className="text-3xl font-semibold uppercase md:text-2xl ">Top Rated Movies</label>
          </div>
          <MovieList category={category.movie} type={movieType.top_rated} />
        </div>

        <div className="flex flex-col mx-32 gap-10">
          <div className="flex items-center justify-between md:flex-col md:items-start md:gap-3">
            <label className="text-3xl font-semibold uppercase md:text-2xl">Top Rated Series</label>
          </div>
          <MovieList category={category.tv} type={tvType.top_rated} />
        </div>

        <div className="flex flex-col mx-32 gap-10">
          <div className="flex items-center justify-between md:flex-col md:items-start md:gap-3">
            <label className="text-3xl font-semibold uppercase md:text-2xl">On Air Series</label>
          </div>
          <MovieList category={category.tv} type={tvType.on_the_air} />
        </div>

        <div className="flex flex-col mx-32 gap-10">
          <div className="flex items-center justify-between md:flex-col md:items-start md:gap-3">
            <label className="text-3xl font-semibold uppercase md:text-2xl">Upcoming Movies</label>
          </div>
          <MovieList category={category.movie} type={movieType.upcoming} />
        </div>
      </div>
      <ScrollToTopButton />
    </main>
  );
}

export default HomePage;