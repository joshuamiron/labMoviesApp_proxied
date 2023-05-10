//----------------------------//
//---------- Movies ----------//
//----------------------------//

export const getMovies = async (page = 1) => {
  //------------------------//
  // --- Get from my API ---//
  //------------------------//
  const res = await fetch(`/api/movies`, {
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });
  return await res.json();
};

export const getMovie = async (args) => {
  //------------------------//
  // --- Get from my API ---//
  //------------------------//
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  const res = await fetch(`/api/movies/${id}`, {
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });
  return await res.json();
};

export const getMovieImages = (args) => {
  //------------------------//
  // --- Get from my API ---//
  //------------------------//
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(`/api/movies/${id}/images`, {
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  }).then((res) => res.json());
};

export const getUpcomingMovies = async () => {
  //------------------------//
  // --- Get from my API ---//
  //------------------------//
  const res = await fetch(`/api/movies/upcoming`, {
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });
  return await res.json();
};

export const getGenres = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
    );
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

/*export const getGenres = async () => {
  //------------------------//
  // --- Get from my API ---//
  //------------------------//
  const res = await fetch(`/api/movies/genres`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  });
  return await res.json();
};*/



/*export const getMovieReviews = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `/api/movies/${id}/reviews`, { // --- Get from my API
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  ).then((res) => res.json());
};*/

export const getMovieReviews = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY
    }`
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(json.results);
      return json.results;
    });
};

 export const getMovieCast = async (id) => {
  //------------------------//
  // --- Get from my API ---//
  //------------------------//
  //const [, idPart] = args.queryKey;
  //const { id } = idPart;
  const res = await fetch(`/api/movies/${id}/credits`, {
     headers: {
       'Authorization': window.localStorage.getItem('token')
     }
   }
   );
   return await res.json();
};

/* export const getMovieCast = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_KEY
    }`
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(`getMovieCast called for movie ID ${id}`);
      console.log(json.cast);
      return json.cast;
    });
};*/

export const getSimilarMovies = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then((res) => res.json())
    .then((json) => {
      //console.log(json.results);
      return json.results;
    });
}; 

/*export const getSimilarMovies = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(`/api/movies/${id}/similar`, {
    // --- Get from my API
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  }).then((res) => res.json());
};*/

export const getPopularMovies = async () => {
  //------------------------//
  // --- Get from my API ---//
  //------------------------//
  const res = await fetch(`/api/movies/popular`, {
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });
  return await res.json();
};

/*export const getTrendingMovies = async () => {
  const res = await fetch(`/api/movies/trending`, {
    // --- Get from my API
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });
  return await res.json();
};*/

export const getTrendingMovies = (page = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${import.meta.env.VITE_TMDB_KEY
    }&language=en-US&page=${page}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .then((data) => {
      console.log("getTrendingMovies called");
      console.log(data); // log the response data
      return data;
    })
    .catch((error) => {
      throw error;
    });
};

//----------------------------//
//---------- People ----------//
//----------------------------//

/* export const getTrendingPeople = (page = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/trending/person/week?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&page=${page}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .then((data) => {
      console.log("getTrendingPeople called");
      console.log(data); // log the response data
      return data;
    })
    .catch((error) => {
      throw error;
    });
}; */

export const getTrendingPeople = async () => {
  //------------------------//
  // --- Get from my API ---//
  //------------------------//
  const res = await fetch(`/api/people/trending`, {
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });
  return await res.json();
};

/* export const getPopularPeople = async () => {
  //------------------------//
  // --- Get from my API ---//
  //------------------------//
  const res = await fetch(`/api/people/popular`, {
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });
  return await res.json();
};*/

 export const getPopularPeople = (page = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/person/popular?api_key=${import.meta.env.VITE_TMDB_KEY
    }&language=en-US&include_adult=false&page=${page}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .then((data) => {
      console.log("getPopularPeople called");
      console.log(data); // log the response data
      return data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getPerson = async (args) => {
  //------------------------//
  // --- Get from my API ---//
  //------------------------//
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  const res = await fetch(`/api/people/${id}`, {
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });
  return await res.json();
};

export const getPersonImages = async (args) => {
  //------------------------//
  // --- Get from my API ---//
  //------------------------//
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  const res = await fetch(`/api/people/${id}/images`, {
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });
  return await res.json();
};

export const getPersonCredits = async (id) => {
  //------------------------//
  // --- Get from my API ---//
  //------------------------//
  const res = await fetch(`/api/people/${id}/movie_credits`, {
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });
  //return await res.json();
  const data = await res.json();
  console.log(`getPersonCredits called for person ID ${id}`);
  console.log(data.cast);
  return data.cast;
};

//----------------------------//
//------------ TV ------------//
//----------------------------//

export const getTVShows = async () => {
  //------------------------//
  // --- Get from my API ---//
  //------------------------//
  const res = await fetch(`/api/tv`, {
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });
  return await res.json();
};

export const getTVShow = async (args) => {
  //------------------------//
  // --- Get from my API ---//
  //------------------------//
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  const res = await fetch(`/api/tv/${id}`, {
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });
  return await res.json();
};

export const getTVShowImages = async (args) => {
  //------------------------//
  // --- Get from my API ---//
  //------------------------//
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  const res = await fetch(`/api/tv/${id}/images`, {
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });
  return await res.json();
};

//----------------------------//
//--------- Accounts ---------//
//----------------------------//

export const signup = async (email, password, firstName, lastName) => {
  const res = await fetch("/api/accounts", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    }),
  });
  return await res.json();
};

export const login = async (email, password) => {
  const res = await fetch("/api/accounts/security/token", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify({ email: email, password: password }),
  });
  return await res.json();
};

export const addFavourite = async (movieId) => {
  const token = localStorage.getItem("token");
  const res = await fetch("/api/accounts/:id/favourites", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "post",
    body: JSON.stringify({
      movieId: movieId,
    }),
  });
  return await res.json();
};
