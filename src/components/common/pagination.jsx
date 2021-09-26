import React, { } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Pagination = (props) => {
    const { itemsCount, pageSize, onPageChange, currentPage } = props;
    const pageCount = Math.ceil(itemsCount / pageSize);
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);
    //get an array [1,2,3] eg. there are 3 pages
    

    return (<nav aria-label="Page navigation example">
        <ul className="pagination">
            {pages.map(page =>
            (<li
                key={page}
                className={page === currentPage ? "page-item active" : "page-item"}
            >
                <a
                    className="page-link"
                    href="/#"
                    onClick={() => onPageChange(page)}>{page}
                    {/* 1, onPageChange is a function pass from movie.jsx via the props; 2 click and call will pass the parameter (page -- the )  */}
                </a>
            </li>))}
        </ul>
    </nav>);
}

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
};

export default Pagination;
