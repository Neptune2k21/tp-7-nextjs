import { GetServerSideProps } from 'next';
import { MovieData } from '@/star-wars-movies';
import Image from 'next/image';
import { useFormattedDuration } from '@/hooks/use-formatted-duration';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const formattedDuration = useFormattedDuration(movie.duration);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="p-4 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
        <button
          onClick={() => router.back()}
          className="text-sm text-blue-600 mb-4 flex items-center gap-2"
        >
          <span>&#8592;</span> Retour
        </button>
        <h1 className="text-3xl font-semibold text-gray-900 mb-4 text-center">{movie.title}</h1>
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <div className="w-full sm:w-1/3">
            <Image
              src={movie.coverImage}
              alt={movie.title}
              width={400}
              height={400}
              className="rounded-lg shadow-md object-cover"
            />
          </div>
          <div className="flex-1 text-gray-800">
            <h2 className="text-xl font-medium mb-2">Description</h2>
            <div
              className="prose prose-sm sm:prose lg:prose-md prose-gray mb-4"
              dangerouslySetInnerHTML={{ __html: movie.details }}
            />
            <p className="text-lg">
              <span className="font-semibold">Durée :</span> {formattedDuration}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Date de sortie :</span> {movie.date}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Images du film</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {movie.images?.map((image, index) => (
              <div key={index} className="w-full">
                <Image
                  src={image}
                  alt={`${movie.title} image ${index + 1}`}
                  width={400}
                  height={250}
                  className="rounded-lg shadow-md object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
