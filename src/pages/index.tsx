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
    <div>
      <h1>Exercice 1 : Listing des films</h1>
      <div style={{ marginBottom: '20px' }}>
        <Link
          href="/?orderBy=chrono"
          style={{
            marginRight: '10px',
            textDecoration: order === 'chrono' ? 'underline' : 'none',  
          }}
        >
          Ordre Chronologique
        </Link>
        <Link
          href="/?orderBy=date"
          style={{
            textDecoration: order === 'date' ? 'underline' : 'none',  
          }}
        >
          Date de Parution
        </Link>
      </div>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <MovieCard movie={movie} />
          </li>
        ))}
      </ul>
    </div>
  );
}
