import { MovieData } from '@/star-wars-movies';
import Image from 'next/image';

export default function MovieCard(props: { movie: MovieData }) {
  return (
    <div>
      <h2>{props.movie.title}</h2>
      <Image src={props.movie.coverImage} alt={props.movie.title} width={500} height={500} />
    </div>
  );
}