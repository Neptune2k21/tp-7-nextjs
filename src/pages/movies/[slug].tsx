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
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">{movie.title}</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-full md:w-1/2">
          <Image
            src={movie.coverImage}
            alt={movie.title}
            width={500}
            height={500}
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="flex-1 text-gray-700">
          <p className="mb-4 font-semibold">Description :</p>
          <div
            className="prose prose-sm sm:prose lg:prose-lg prose-blue"
            dangerouslySetInnerHTML={{ __html: movie.details }}
          />
          <p className="mt-4">
            <span className="font-semibold">Durée :</span> {movie.duration} minutes
          </p>
          <p>
            <span className="font-semibold">Date de sortie :</span> {movie.date}
          </p>
        </div>
      </div>
    </div>
  );
}
