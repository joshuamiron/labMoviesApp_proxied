//---------------------------------//
//--- Movies (from Express API) ---//
//---------------------------------//

export const getMovies = async (page = 1) => {
  const res = await fetch(`/api/movies/?page=${page}`, {
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });
  return await res.json();
};

export const getMovie = async (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  const res = await fetch(`/api/movies/${id}`, {
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });
  return await res.json();
};

export const getMovieImages = async (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  const res = await fetch(`/api/movies/${id}/images`, {
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });
  return await res.json();
};

export const getUpcomingMovies = async (page = 1) => {
  const res = await fetch(`/api/movies/upcoming?page=${page}`, {
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });
  return await res.json();
};

export const getPopularMovies = async (page = 1) => {
  const res = await fetch(`/api/movies/popular?page=${page}`, {
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });
  return await res.json();
};

export const getTrendingMovies = async (page = 1) => {
  const res = await fetch(`/api/movies/trending?page=${page}`, {
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });
  return await res.json();
};

export const getGenres = async () => {
  const res = await fetch(`/api/movies/genres`, {
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });
  return await res.json();
};

export const getMovieCast = async (id) => {
  const res = await fetch(`/api/movies/${id}/credits`, {
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });
  const data = await res.json();
  return data.cast;
};

export const getSimilarMovies = async (id) => {
  const res = await fetch(`/api/movies/${id}/similar`, {
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });
  const data = await res.json();
  return data.results;
};

export const getRecommendedMovies = async (id) => {
  const res = await fetch(`/api/movies/${id}/recommended`, {
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });
  const data = await res.json();
  return data.results;
};

export const getMovieReviews = async (id) => {
  const res = await fetch(`/api/movies/${id}/reviews`, {
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });
  const data = await res.json();
  return data.results;
};

//---------------------------------//
//--- People (from Express API) ---//
//---------------------------------//

export const getTrendingPeople = async (page = 1) => {
  const res = await fetch(`/api/people/trending?page=${page}`, {
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });
  return await res.json();
};

export const getPopularPeople = async (page = 1) => {
  const res = await fetch(`/api/people/popular?page=${page}`, {
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });
  return await res.json();
};

export const getPerson = async (args) => {
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
  const res = await fetch(`/api/people/${id}/movie_credits`, {
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });
  const data = await res.json();
  return data.cast;
};

//-----------------------------//
//--- TV (from Express API) ---//
//-----------------------------//

export const getTVShows = async (page = 1) => {
  const res = await fetch(`/api/tv/shows?page=${page}`, {
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });
  return await res.json();
};

export const getTVShow = async (args) => {
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
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  const res = await fetch(`/api/tv/${id}/images`, {
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });
  return await res.json();
};

//-----------------------------------//
//--- Accounts (from Express API) ---//
//-----------------------------------//

export const createAccount = async (email, password, firstName, lastName) => {
  const res = await fetch(`/api/accounts`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    }),
  });
  return await res.json();
};

export const authenticateAccount = async (email, password) => {
  const res = await fetch(`/api/accounts/security/token`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ email: email, password: password }),
  });
  return await res.json();
};

export const getAccount = async (email) => {
  console.log("getAccount called");
    const response = await fetch(`/api/accounts/getaccount/${email}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    const data = await response.json();
    console.log("getAccount called");
    console.log(data);
    return data;
  };

//----------------
//----------------



/*export const addFavourite = async (movieId) => {
  const token = localStorage.getItem("token");
  const res = await fetch("/api/accounts/:id/favourites", {
    headers: {"Content-Type": "application/json", 
    Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify({
      movieId: movieId,
    }),
  });
  return await res.json();
};*/

export const addFavourite = async (movieId, email) => {
  try {
    const response = await fetch(`/api/accounts/${email}/favourites`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movieId, email }),
    });
    const data = await response.json();
    return { ok: response.ok, data };
  } catch (error) {
    throw new Error("Failed to add favorite movie: " + error.message);
  }
};
