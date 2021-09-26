import React from 'react';
import _ from "lodash";
/*
onLike
onDelete
movies
*/

class TableBody extends React.Component {

    renderCell = (item, column) => {
        if (column.content) return column.content(item);
        else return _.get(item, column.path);
    }
    createKey = (item, column) => {
        return item._id + (column.path || column.key);
    }

    render() {
        const { data, columns } = this.props;
        return <tbody>

            {data.map(item =>
                <tr key={item._id}>
                    {columns.map(column => <td key={this.createKey(item, column)}>{this.renderCell(item, column)}</td>)}
                </tr>
            )}
        </tbody>;
    }
}

export default TableBody;

// const TableBody = (props) => {
//     const { movies, onDelete, onLike } = props
//     return <tbody>
//         {movies.map((movie) => (
//             <tr key={movie._id}>
//                 <td>{movie.title}</td>
//                 <td>{movie.genre.name}</td>
//                 <td>{movie.numberInStock}</td>
//                 <td>{movie.dailyRentalRate}</td>
//                 <td> <Like liked={movie.liked} onClick={() => onLike(movie)} /> </td>
//                 <td>
//                     <button
//                         onClick={() => onDelete(movie)}
//                         className="btn btn-danger btn-sm"
//                     >
//                         Delete
//                     </button>
//                 </td>
//             </tr>
//         ))}
//     </tbody>

//         ;
// }

// export default TableBody;