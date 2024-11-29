// pages/movies/[slug].tsx
import { GetServerSideProps } from 'next';
import { MovieData } from '@/star-wars-movies';
import Image from 'next/image';

type MoviePageProps = {
  movie: MovieData;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { slug } = ctx.params!;
  const movies: MovieData[] = await import('@/star-wars-movies').then(
    (module) => module.MOVIES
  );

  const movie = movies.find((m) => m.slug === slug);

  if (!movie) {
    return { notFound: true };
  }

  return {
    props: { movie },
  };
};

export default function MoviePage({ movie }: MoviePageProps) {
  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.details}</p>
      <p>Durée : {movie.duration} minutes</p>
      <p>Date de sortie : {movie.date}</p>
      <Image
        src={movie.coverImage}
        alt={movie.title}
        width={500}
        height={500}
      />
    </div>
  );
}
