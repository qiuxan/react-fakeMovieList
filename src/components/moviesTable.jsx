import React from 'react';
import TableHeader from './common/tableHeader';
import TableBody from './common/tableBody';
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

            <TableBody
                onLike={onLike}
                onDelete={onDelete}
                movies={movies}
            />
        </table >);

    }
}

export default MoviesTable;
