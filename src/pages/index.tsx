// pages/index.tsx
import { MovieData } from '@/star-wars-movies';
import MovieCard from '@/components/movie-card';

type PageProps = {
  movies: MovieData[];
  order: string;
};

export const getServerSideProps = async () => {
  const movies: MovieData[] = await import('@/star-wars-movies').then(
    (module) => module.MOVIES
  );

  return {
    props: {
      movies: movies,
      order: 'asc',
    },
  };
};

export default function HomePage(props: PageProps) {
  return (
    <div>
      <h1>Exercice 1 : Listing des films</h1>
      <ul>
        {props.movies.map((movie) => (
          <li key={movie.id}>
            <MovieCard movie={movie} />
          </li>
        ))}
      </ul>
    </div>
  );
}
