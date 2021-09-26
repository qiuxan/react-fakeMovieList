import React, { } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";

import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import _ from 'lodash';

class Movies extends React.Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    sortColumn: { path: 'title', order: 'asc' }
  };

  componentDidMount() {

    const genres = [{ _id: '', name: "All Genre" }, ...getGenres()]
    this.setState({ movies: getMovies(), genres });

  }

  getMovies = () => {
    if (this.state.movies.length === 0) {
      return "Please add movies";
    }
  };
  handlePageChange = page => {
    this.setState({ currentPage: page });
  }
  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  }
  handleLike = (movie) => {

    const movies = this.state.movies.map(m => {
      if (m._id === movie._id) {
        movie.liked = !movie.liked;
        return m;
      }
      else
        return m;
    });
    this.setState(movies);
  }
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  }
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  }

  getPageData = () => {

    const { pageSize, currentPage, selectedGenre, movies: allMovies, sortColumn } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id ?
        allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { data: movies, totalCount: filtered.length };

  }

  render() {

    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn } = this.state;

    const { totalCount, data: movies } = this.getPageData();

    if (count === 0) return <p>There is no movies in the database!</p>;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-3">
              <ListGroup
                items={this.state.genres}
                onItemSelect={this.handleGenreSelect}
                selectedItem={this.state.selectedGenre}
              />
            </div>
            <div className="col">
              <p>There is {totalCount} movies in the database!</p>
              <MoviesTable
                movies={movies}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
                sortColumn={sortColumn}
              />
              <Pagination
                itemsCount={totalCount}
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
