import React, { } from "react";
// import { getMovies } from "../services/fakeMovieService";
import { toast } from 'react-toastify';
import { deleteMovie, getMovies } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { Link } from "react-router-dom";
import _ from 'lodash';
import SearchBox from "./common/searchBox";

class Movies extends React.Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    searchQuery: "",
    sortColumn: { path: 'title', order: 'asc' }

  };

  async componentDidMount() {

    const { data } = await getGenres();
    const { data: movies } = await getMovies();

    const genres = [{ _id: '', name: "All Genre" }, ...data]
    this.setState({ movies: movies, genres });

  }

  getMovies = () => {
    if (this.state.movies.length === 0) {
      return "Please add movies";
    }
  };
  handlePageChange = page => {
    // console.log(page);
    this.setState({ currentPage: page });
  }
  handleDelete = async movie => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    }
    catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error('This movie has already been deleted');
        this.setState({ movies: originalMovies });
      }
    }

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
    this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: "" });
  }

  handleSearch = query => {

    // this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });

    // console.log(query);

  }

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };


  // getPageData = () => {

  //   const { pageSize, currentPage, selectedGenre, movies: allMovies, sortColumn } = this.state;

  //   const filtered =
  //     selectedGenre && selectedGenre._id ?
  //       allMovies.filter(m => m.genre._id === selectedGenre._id)
  //       : allMovies;

  //   const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
  //   const movies = paginate(sorted, currentPage, pageSize);

  //   return { data: movies, totalCount: filtered.length };

  // }

  //before adding search feature



  render() {


    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    const { user } = this.props;
    // console.log(user);

    const { totalCount, data: movies } = this.getPagedData();

    if (count === 0) return <p>There is no movies in the database!</p>;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3">

            <ListGroup
              items={this.state.genres}
              onItemSelect={this.handleGenreSelect}
              selectedItem={this.state.selectedGenre}
            />
          </div>
          <div className="col">

            {user && (<Link to="/movies/new" className="btn btn-primary mb-3">New Movie</Link>)}

            <p>There is {totalCount} movies in the database!</p>

            <SearchBox value={searchQuery} onChange={this.handleSearch} />
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
      </React.Fragment>
    );
  }
}
export default Movies;
