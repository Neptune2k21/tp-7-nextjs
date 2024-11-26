import { MovieData } from "@/star-wars-movies";
import { GetServerSideProps } from "next";
import  MovieCard  from "@/components/movie-card";
import Image from "next/image";
type Pageprops={
  movies: MovieData[];
  order: string
}
export const getServerSideProps=(async()=>{
  const movies: MovieData[]= await import ('@/star-wars-movies')
  .then(module=>module.MOVIES);
  return{
    props:{
      movies: movies,
      order: 'asc'
    }
  }
})
export default function HomePage(props: Pageprops) {
  return (
    <div>
      <h1>Exercice 1 Listing des films</h1>
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