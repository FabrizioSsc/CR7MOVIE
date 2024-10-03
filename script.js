import api_key from "./api-key.js"; //importing api key

const lang = "pt-BR"; //language

//elements
const search = document.getElementById("form");
const searchInput = document.getElementById("search");

//getting image to poster
const getImage = "https://image.tmdb.org/t/p/";
const imageWidth = "original";  //w300 - original

function getMoviePoster(path_) {
    return getImage + imageWidth + path_;
}

//request discover movies
function requestMovies() {    
    const requestOptions = {
        method: "GET",
        url: `https://api.themoviedb.org/3/discover/movie?language=${lang}`,
        headers: {
            accept: 'application/json',
            Authorization: api_key
        }
    }

    axios(requestOptions)
    .then(response => {
        discoverMovies(response.data);
        return;
    })
    .catch(error => {
        console.log(error);
        return false;
    })
}

function discoverMovies(dataMovies) {
    const len = dataMovies.results.length;
    console.log(dataMovies)
    for(var i = 0; i < len; i++) {
        const index = dataMovies.results[i];
        const movie = {
            title: index.title,
            description: index.overview,
            poster: getMoviePoster(index.poster_path),
            score: index.vote_average

        }

        addMovieInDiscover(movie.title, movie.description, movie.poster);
    }
}

//clear home
function removeMovies() {
    //destroy all movies in discover
    const movies = document.querySelectorAll(".movie");
    movies.forEach(m => {
        m.remove();
    });
}

//request searched movies
var movieSearched = undefined;

function requestMoviesSearch(movie_) {
    movieSearched = movie_;

    const requestOptionsSearch = {
        method: "GET",
        url: `https://api.themoviedb.org/3/search/movie?query=${movieSearched}&language=${lang}`,
        headers: {
            accept: 'application/json',
            Authorization: api_key
        }   
    }

    axios(requestOptionsSearch)
    .then(response => {
        searchMovies(response.data);
        return;
    }).catch(error => {
        console.log(error);
        return false;
    })
}

function searchMovies(dataMovies) {
    const len = dataMovies.results.length;

    for(var i = 0; i < len; i++) {
        const index = dataMovies.results[i];
        const movie = {
            title: index.title,
            description: index.overview,
            poster: getMoviePoster(index.poster_path)
        }
        
        addMovieInDiscover(movie.title, movie.description, movie.poster);
    }
}

search.onsubmit = (ev) => { //input execute all
    ev.preventDefault();
    
    removeMovies();

    requestMoviesSearch(searchInput.value);
}

//add elements in home
const discover = document.getElementById("main");

function addMovieInDiscover(title_, description_, img_ = "", score_ = 10) {
    
    const movie = document.createElement("div");
    movie.className = "movie";
        
        const imgElement = document.createElement("img");
        imgElement.className = "movie-poster";
        imgElement.src = img_;
        
        const movieInfo = document.createElement("div");
        movieInfo.className = "movie-info";

            const movieTitle = document.createElement("h3");
            movieTitle.innerHTML = title_;

            const score = document.createElement("span");
            score.className = "green";
            score.innerHTML = score_;

            movieInfo.append(movieTitle);
            movieInfo.append(score);

        const overview = document.createElement("div");
        overview.className = "overview";
        overview.innerHTML = description_;

    movie.append(imgElement);
    movie.append(movieInfo);
    movie.append(overview);

    discover.append(movie);
}

requestMovies();
