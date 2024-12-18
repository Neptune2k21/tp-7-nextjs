import { MovieData } from '@/star-wars-movies';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function MovieCard(props: { movie: MovieData }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/movies/${props.movie.slug}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col items-center text-center hover:bg-gray-50"
    >
      <div className="w-full overflow-hidden rounded-lg">
        <Image
          src={props.movie.coverImage}
          alt={props.movie.title}
          width={400}
          height={400}
          className="object-cover w-full h-auto group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h2 className="mt-4 text-xl font-semibold text-gray-900 group-hover:text-blue-500 transition-colors duration-300">
        {props.movie.title}
      </h2>
    </div>
  );
}
