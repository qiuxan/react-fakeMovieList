import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/movies";
export function getMovies() {
    return http.get(apiEndpoint);
}

function movieUrl(id) {
    return `${apiEndpoint}/${id}`;
}


export function deleteMovie(movieId) {
    return http.delete(movieUrl(movieId));
}

export function getMovie(id) {

    return http.get(movieUrl(id));
    // return movies.find(m => m._id === id);
}

export function saveMovie(movie) {
    if (movie._id) {
        const body = { ...movie };
        delete body._id;
        console.log(body);
        return http.put(movieUrl(movie._id), body);
    }
    return http.post(apiEndpoint, movie);

}