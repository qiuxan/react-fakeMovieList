import React from 'react';

const ListGroup = ({ items, textProperty, valueProperty, onItemSelect, selectedItem }) => {
    // console.log(props.selectedItem);
    return (

        <ul className="list-group">
            {items.map(
                g =>
                    <li
                        key={g[valueProperty]}
                        className={g === selectedItem ? "list-group-item active" : "list-group-item"}
                        onClick={() => onItemSelect(g)}>
                        {g[textProperty]}
                    </li>
            )}
        </ul>

    );
};

ListGroup.defaultProps = {
    textProperty: "name",
    valueProperty: "_id"
}


export default ListGroup;