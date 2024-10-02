
/*
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
*/

import api_key from "./api-key.js"; // Certifique-se de que este arquivo exista e contenha a chave da API.

const lang = "pt-BR";
const discover = document.getElementById("main");

const form = document.getElementById('form');
const searchInput = document.getElementById('search');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário
    const query = searchInput.value.trim(); // Captura o valor da busca

    if (query) {
        searchMovies(query); // Chama a função de busca com o termo
    }
});

function searchMovies(query) {
    const requestOptions = {
        method: "GET",
        url: `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=${lang}&api_key=${api_key}`,
        headers: {
            accept: 'application/json'
        }   
    };

    axios(requestOptions)
        .then(response => {
            discover.innerHTML = ""; // Limpa filmes anteriores
            renderizarFilmes(response.data); // Renderiza os filmes encontrados
        })
        .catch(error => {
            console.error(error);
            discover.innerHTML = "<p>Falha ao carregar filmes. Por favor, tente novamente mais tarde.</p>";
        });
}

function getMoviePoster(path) {
    return path ? `https://image.tmdb.org/t/p/original${path}` : "caminho/para/imagem-padrão.jpg";
}

function renderizarFilmes(dataMovies) {
    const len = dataMovies.results.length;

    for (let i = 0; i < len; i++) {
        const index = dataMovies.results[i];
        const movie = {
            title: index.title || "Sem Título",
            description: index.overview || "Nenhuma descrição disponível.",
            poster: getMoviePoster(index.poster_path)
        };

        adicionarFilmeNaDescoberta(movie.title, movie.description, movie.poster, index.vote_average);
    }
}

function adicionarFilmeNaDescoberta(title, description, img, score) {
    const movie = document.createElement("div");
    movie.className = "movie";
    
    const imgElement = document.createElement("img");
    imgElement.className = "movie-poster";
    imgElement.src = img;
    
    const movieInfo = document.createElement("div");
    movieInfo.className = "movie-info";

    const movieTitle = document.createElement("h3");
    movieTitle.innerHTML = title;

    const scoreElement = document.createElement("span");
    scoreElement.innerHTML = score ? score.toFixed(1) : "N/A";
    
    movieInfo.append(movieTitle);
    movieInfo.append(scoreElement);

    const overview = document.createElement("div");
    overview.innerHTML = description;

    movie.append(imgElement);
    movie.append(movieInfo);
    movie.append(overview);

    discover.append(movie);
}


