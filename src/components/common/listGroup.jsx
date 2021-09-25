import React from 'react';

const ListGroup = (props) => {
    // console.log(props.selectedItem);
    const { items, textProperty, valueProperty, onItemSelect, selectedItem } = props;
    return (

        <ul className="list-group">
            {/* <li className="list-group-item">Cras justo odio</li> */}
            {/* <li className="list-group-item">Cras justo odio</li> */}
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