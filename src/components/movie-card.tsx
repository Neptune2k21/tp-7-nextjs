import { MovieData } from '@/star-wars-movies';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function MovieCard(props: { movie: MovieData }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/movies/${props.movie.slug}`);
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      <h2>{props.movie.title}</h2>
      <Image
        src={props.movie.coverImage}
        alt={props.movie.title}
        width={500}
        height={500}
      />
    </div>
  );
}
