import { MovieData } from '@/star-wars-movies';
import MovieCard from '@/components/movie-card';
import Link from 'next/link';

type PageProps = {
  movies: MovieData[];
  order: string;
};

export const getServerSideProps = async (ctx: any) => {
  const movies: MovieData[] = await import('@/star-wars-movies').then(
    (module) => module.MOVIES
  );

  const orderBy = ctx.query.orderBy || 'chrono';
  const sortedMovies =
    orderBy === 'date'
      ? [...movies].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      : [...movies].sort((a, b) => a.order - b.order);

  return {
    props: {
      movies: sortedMovies,
      order: orderBy,
    },
  };
};

export default function HomePage({ movies, order }: PageProps) {
  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold text-center mb-6">Exercice 1 : Listing des films</h1>
      <div className="flex justify-center gap-4 mb-6">
        <Link
          href="/?orderBy=chrono"
          className={`font-bold transition-colors ${
            order === 'chrono' ? 'underline text-blue-600' : 'text-blue-400'
          }`}
        >
          Ordre Chronologique
        </Link>
        <Link
          href="/?orderBy=date"
          className={`font-bold transition-colors ${
            order === 'date' ? 'underline text-blue-600' : 'text-blue-400'
          }`}
        >
          Date de Parution
        </Link>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <li
            key={movie.id}
            className="bg-gray-100 border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform"
          >
            <MovieCard movie={movie} />
          </li>
        ))}
      </ul>
    </div>
  );
}
