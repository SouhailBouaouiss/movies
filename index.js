const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzJlNDU3ZWU0MGU3NzZiMTllMjEzZGJjM2UzYTAwZCIsInN1YiI6IjYzODlkNjRkNjllYjkwMDA3YmRiYjQ3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VMC465KfRUjijF4_S0mvtrWAtzp09OaiuNP4gkOIllY",
  },
};
const apiGenresURL =
  "https://api.themoviedb.org/3/genre/movie/list?language=en";
const apiGenreURL = "https://api.themoviedb.org/3/list/";

let movies = [];

const genreButton = document.querySelector("section");
const moviePoster = document.querySelector(".movie");
const searchInput = document.querySelector("input[type = text]");
const homeButton = document.querySelector("#home");

// Fetch data

const fetchApiData = async () => {
  const response = await fetch(
    ` https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
    options
  );
  const data = await response.json();
  return data;
};

const PosterHtml = (obj) => {
  return ` <div class="col-md-2 movies gap-3 mt-5">
<img
  src="https://image.tmdb.org/t/p/w500${obj.poster_path}"
  alt=""
/>
<h6 style="text-align: center">${obj.title}</h6>

</div>`;
};

// // Add poster to movies table

searchInput.addEventListener("keydown", () => {
  filterMovies(movies);
});

// // Inner HTML
const displayMovies = (arr) => {
  moviePoster.innerHTML = "";
  arr.forEach((element) => {
    moviePoster.innerHTML += PosterHtml(element);
  });
};

const fetchMovies = () => {
  fetchApiData().then((data) => {
    movies = data.results;
    displayMovies(movies);
  });
};
fetchMovies();
// // Filter movies
const filterMovies = (arr) => {
  const searchValue = searchInput.value.toLowerCase();
  displayMovies(
    arr.filter((element) => element.title.toLowerCase().includes(searchValue))
  );
};

// // Fetch genre Api

const fetchGenreApi = async () => {
  const responseGenre = await fetch(apiGenresURL, options);
  const dataGenre = await responseGenre.json();
  return dataGenre;
};

// Fetch genres

const fetchGenres = () => {
  fetchGenreApi().then((dataGenre) => {
    let genre = dataGenre.genres;
    displayGenres(genre);
  });
};
fetchGenres();

// Inner HTML

const buttonHtml = (dataGenre) => {
  return `
    <button type="button" class="btn btn-outline-danger genre" id="${dataGenre.id}">
      ${dataGenre.name}
    </button>
  `;
};

const displayGenres = (arr) => {
  genreButton.innerHTML = "";
  arr.forEach((element) => {
    genreButton.innerHTML += buttonHtml(element);
  });
  const genreButtons = document.querySelectorAll(".genre");
  genreButtons.forEach((element) => {
    element.addEventListener("click", () => {
      var buttonId = element.getAttribute("id");
      fetchOneGenreApi(buttonId).then((data) => {
        movies = data.items;
        displayMovies(movies);
      });
    });
  });
};

// Fetch one genre API

const fetchOneGenreApi = async (id) => {
  const responseOneGenre = await fetch(apiGenreURL + id, options);
  const dataOneGenre = await responseOneGenre.json();
  return dataOneGenre;
};

homeButton.addEventListener("click", () => {
  fetchMovies();
});
