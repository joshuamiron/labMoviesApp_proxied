//----------------------------//
//---------- Movies ----------//
//----------------------------//

export const getMovies = () => {
  return fetch(`/api/movies`, {
    // --- Get from my API
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  }).then((res) => res.json());
};

export const getMovie = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(`/api/movies/${id}`, {
    // --- Get from my API
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  }).then((res) => res.json());
};

export const getGenres = () => {
  return fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_KEY
    }&language=en-US`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

/*export const getGenres = () => {
  return fetch(
    `/api/movies/genres`, { // --- Get from my API
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  )
    .then((res) => res.json());
};*/

export const getMovieImages = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(`/api/movies/${id}/images`, {
    // --- Get from my API
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  }).then((res) => res.json());
};

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

export const getUpcomingMovies = async () => {
  const res = await fetch(`/api/movies/upcoming`, {
    // --- Get from my API
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });
  return await res.json();
};

/* export const getMovieCast = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `/api/movies/${id}/credits`, { // --- Get from my API
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }}
  ).then((res) => res.json());
};*/

export const getMovieCast = (id) => {
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
};

/*export const getSimilarMovies = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then((res) => res.json())
    .then((json) => {
      //console.log(json.results);
      return json.results;
    });
}; */

export const getSimilarMovies = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(`/api/movies/${id}/similar`, {
    // --- Get from my API
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  }).then((res) => res.json());
};

export const getPopularMovies = async () => {
  const res = await fetch(`/api/movies/popular`, {
    // --- Get from my API
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

export const getTrendingPeople = (page = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/trending/person/week?api_key=${import.meta.env.VITE_TMDB_KEY
    }&language=en-US&include_adult=false&page=${page}`
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
};

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

export const getPerson = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${import.meta.env.VITE_TMDB_KEY
    }`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .then((data) => {
      console.log("getPerson called");
      console.log(data); // log the response data
      return data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getPersonImages = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/person/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY
    }`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getPersonCredits = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${import.meta.env.VITE_TMDB_KEY
    }`
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(`getPersonCredits called for person ID ${id}`);
      console.log(json.cast);
      return json.cast;
    });
};

//----------------------------//
//------------ TV ------------//
//----------------------------//

/*export const getTVShows = (page = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .then((data) => {
      console.log("getTVShows called");
      console.log(data); // log the response data
      return data;
    })
    .catch((error) => {
      throw error;
    });
};*/

export const getTVShows = () => {
  return fetch(`/api/tv`, {
    // --- Get from my API
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  }).then((res) => res.json());
};

/* export const getTVShow = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .then((data) => {
      console.log("getTVShow called");
      console.log(data); // log the response data
      return data;
    })
    .catch((error) => {
      throw error;
    });
}; */

export const getTVShow = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(`/api/tv/${id}`, {
    // --- Get from my API
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  }).then((res) => res.json());
};

/* export const getTVShowImages = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
}; */

export const getTVShowImages = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(`/api/tv/${id}/images`, {
    // --- Get from my API
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  }).then((res) => res.json());
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
