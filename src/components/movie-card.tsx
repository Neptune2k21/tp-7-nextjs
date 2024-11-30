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
      className="group cursor-pointer bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col items-center text-center"
    >
      <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
        {props.movie.title}
      </h2>
      <div className="w-full overflow-hidden rounded-md mt-4">
        <Image
          src={props.movie.coverImage}
          alt={props.movie.title}
          width={500}
          height={500}
          className="object-cover w-full h-auto group-hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  );
}
