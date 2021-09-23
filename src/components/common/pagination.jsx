import React, { } from 'react';
import _ from 'lodash';



const Pagination = (props) => {

    const { itemsCount, pageSize, onPageChange, currentPage } = props;
    console.log(currentPage);
    const pageCount = Math.ceil(itemsCount / pageSize);
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);

    // console.log(pages);
    return (<nav aria-label="Page navigation example">
        <ul className="pagination">
            {pages.map(page =>

            (<li
                key={page}
                className="page-item"
            >
                <a className="page-link" href="/#" onClick={() => onPageChange(page)}>{page}</a>
            </li>))}
        </ul>
    </nav>);
}

export default Pagination;
// class Pagination extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {}
//     }
//     render() {
//         const { movies } = this.props;
//         console.log(this.props);
//         return (

//         );
//     }
// }
// export default Pagination;