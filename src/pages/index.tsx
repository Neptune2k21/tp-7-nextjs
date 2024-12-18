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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-900">
      Exercice 1 : Listing des films
      </h1>
      <div className="flex justify-center gap-6 mb-8">
        <Link
          href="/?orderBy=chrono"
          className={`text-lg font-medium transition-all px-4 py-2 rounded-full shadow-md ${order === 'chrono' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
        >
          Ordre Chronologique
        </Link>
        <Link
          href="/?orderBy=date"
          className={`text-lg font-medium transition-all px-4 py-2 rounded-full shadow-md ${order === 'date' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
        >
          Date de Parution
        </Link>
      </div>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <li
            key={movie.id}
            className="bg-white border border-gray-300 rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition-all duration-300"
          >
            <MovieCard movie={movie} />
          </li>
        ))}
      </ul>
    </div>
  );
}
