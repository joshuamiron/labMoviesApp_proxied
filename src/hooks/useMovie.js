import { useEffect, useState } from "react";
import { getMovie } from '../api/api';

const useMovie = id => {
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    getMovie(id).then(movie => {
      setMovie(movie);
    });
  }, [id]);
  return [movie, setMovie];
};

export default useMovie
