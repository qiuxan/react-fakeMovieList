import React, { } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";

import Like from "./common/like";
import Pagination from "./common/pagination";
import Genres from "./common/genres";



class Movies extends React.Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1,
    genres: getGenres(),
    currentGenre: null
  };

  getMovies = () => {
    if (this.state.movies.length === 0) {
      return "Please add movies";
    }
  };
  handlePageChange = page => {
    // console.log(page);
    this.setState({ currentPage: page });
  }
  handleDelete(movie) {
    // console.log(movie);
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  }
  handleLike = (movie) => {
    // console.log(movie);
    // const movies = this.state.movies.map(m => {
    //   // console.log(movie);
    //   if (m._id === movie._id) {
    //     movie.liked = !movie.liked;
    //   }
    // });

    const movies = this.state.movies.map(m => {
      // console.log(m) 
      if (m._id === movie._id) {
        // console.log(m.liked);
        movie.liked = !movie.liked;
        return m;
      }
      else
        return m;
    });
    // console.log(movies)

    this.setState(movies);
    // movies.map

    // console.log('like clicked');
  }
  // constructor() {

  //   super();
  //   this.handleGetGenre = this.handleGetGenre.bind(this);
  // }

  handleGetGenre = (genre) => {

    // console.log(genre);
    this.setState({ currentGenre: genre })

    // this.setState({ currentPage: page });


  }



  render() {

    // console.log(this.state.currentGenre);
    const { length: count } = this.state.movies;
    // const { length: genCount } = this.state.genres;
    // const { movies, pageSize, currentPage } = this.state;
    const { pageSize, currentPage, genres, currentGenre } = this.state;

    console.log(this.state.currentGenre);

    // this.state.currentGenre === null ?const genreMovies = this.state.movies:this.state.movies;

    // console.log(genreMovies);

    // else {
    //   const genreMovies = this.state.movies.filter(m => m.genre.name === this.state.currentGenre);
    // }

    // console.log(genreMovies);


    let movies = this.state.movies.filter(m => m.genre.name === currentGenre);

    const genMovies = currentGenre === null ? this.state.movies : movies;


    console.log(genMovies);

    movies = paginate(genMovies, currentPage, pageSize);
    // console.log(genres);
    if (count === 0) return <p>There is no movies in the database!</p>;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-3">
              <Genres
                onGetGenre={this.handleGetGenre}
                genres={genres}
              // genCount={genCount}

              />
            </div>
            <div className="col-9">
              <p>There is {count} movies in the database!</p>
              <table className="table">
                <thead>
                  <tr>
                    <th>
                      <b>Title</b>
                    </th>
                    <th>
                      <b>Genre</b>
                    </th>
                    <th>
                      <b>Stock</b>
                    </th>

                    <th>
                      <b>RATE</b>
                    </th>
                    <th>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {movies.map((movie) => (
                    <tr key={movie._id}>
                      <td>{movie.title}</td>
                      <td>{movie.genre.name}</td>
                      <td>{movie.numberInStock}</td>

                      <td>{movie.dailyRentalRate}</td>
                      <td> <Like liked={movie.liked} onClick={() => this.handleLike(movie)} /> </td>
                      <td>
                        <button
                          onClick={() => this.handleDelete(movie)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Pagination
                itemsCount={count}
                pageSize={pageSize}
                onPageChange={this.handlePageChange}
                currentPage={currentPage}
              />
            </div>

          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Movies;
