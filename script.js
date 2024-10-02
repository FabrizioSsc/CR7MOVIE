import api_key from "./api-key.js";

const lang = "pt-BR";

const requestOptions = {
    method: "GET",
    url: `https://api.themoviedb.org/3/discover/movie?language=${lang}`,
    headers: {
        accept: 'application/json',
        Authorization: api_key
    }   
}

function requestMovies() {
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

const getImage = "https://image.tmdb.org/t/p/";
const ImageWidth = "original";  //w300 - original

function getMoviePoster(path_) {
    return getImage + ImageWidth + path_;
}

function discoverMovies(dataMovies) {
    console.log(dataMovies.results);

    const len = dataMovies.results.length;

    for(var i = 0; i < len; i++) {
        const index = dataMovies.results[i];
        const movie = {
            title: index.title,
            description: index.overview,
            poster: getMoviePoster(index.poster_path)
        }
        console.log(dataMovies.results[i].title);

        addMovieInDiscover(movie.title, movie.description, movie.poster);
    }

    
}

function addMovieInDiscover(title_, description_, img_ = "") {
    
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
            score.innerHTML = "10";
            
            movieInfo.append(movieTitle);
            movieInfo.append(score);

        const overview = document.createElement("div");
        overview.innerHTML = description_;

    movie.append(imgElement);
    movie.append(movieInfo);
    movie.append(overview);

    discover.append(movie);
}

const discover = document.getElementById("main");

requestMovies();