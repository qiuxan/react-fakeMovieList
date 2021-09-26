import React from 'react';
import TableHeader from './common/tableHeader';
import Like from './common/like';


class MoviesTable extends React.Component {
    columns = [
        { path: 'title', label: 'Title' },
        { path: 'genre.name', label: 'Genre' },
        { path: 'numberInStock', label: 'Stock' },
        { path: 'dailyRentalRate', label: 'RATE' },
        { key: 'like' },
        { key: 'delete' }
    ];

    render() {
        const { movies, onLike, onDelete, sortColumn, onSort } = this.props;
        return (<table className="table">

            <TableHeader
                columns={this.columns}
                sortColumn={sortColumn}
                onSort={onSort}
            />

            {/* <thead>
                <tr>
                    <th onClick={() => this.raiseSort("title")}><b>Title</b></th>
                    <th onClick={() => this.raiseSort("genre.name")}><b>Genre</b></th>
                    <th onClick={() => this.raiseSort("numberInStock")}><b>Stock</b></th>
                    <th onClick={() => this.raiseSort("dailyRentalRate")}><b>RATE</b></th>
                    <th>
                    </th>
                    <th></th>
                </tr >
            </thead > */}
            <tbody>
                {movies.map((movie) => (
                    <tr key={movie._id}>
                        <td>{movie.title}</td>
                        <td>{movie.genre.name}</td>
                        <td>{movie.numberInStock}</td>

                        <td>{movie.dailyRentalRate}</td>
                        <td> <Like liked={movie.liked} onClick={() => onLike(movie)} /> </td>
                        <td>
                            <button
                                onClick={() => onDelete(movie)}
                                className="btn btn-danger btn-sm"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table >);

    }
}

export default MoviesTable;
