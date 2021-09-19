import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Movies extends React.Component {
  state = {
    movies: getMovies(),
  };

  getMovies = () => {
    if (this.state.movies.length === 0) {
      return "Please add movies";
    }
  };
  handleDelete(movie) {
    console.log(movie);
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  }

  render() {
    const { length: count } = this.state.movies;
    if (count === 0) return <p>There is no movies in the database!</p>;
    return (
      <React.Fragment>
        <p>There is {count} movies in the database!</p>
        <table>
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
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
      </React.Fragment>
    );
  }
}
export default Movies;
