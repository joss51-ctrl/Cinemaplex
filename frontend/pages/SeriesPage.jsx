import MovieGrid from '../components/MoviesGrid';
import { useParams } from 'react-router-dom';
import ScrollTop from '../components/ScrollTop';

function SeriesPage() {
  const { category: urlCategory } = useParams();

  const headerTitle = urlCategory === "movie" ? "Movies" : "Series";
  const apiCategory = urlCategory === "movie" ? "movie" : "tv";

  return (
    <main className='bg-linear-to-r from-slate-800 to-zinc-900 '>
      <div className='flex flex-col justify-center items-start min-h-screen px-14 w-full pt-28 gap-10 pb-16'>
        <h1 className='font-bold text-3xl uppercase text-amber-50'>
          {headerTitle}
        </h1>

        <div className="w-full">
          <MovieGrid category={apiCategory} />
        </div>
      </div>
      <ScrollTop />
    </main>
  );
}

export default SeriesPage;