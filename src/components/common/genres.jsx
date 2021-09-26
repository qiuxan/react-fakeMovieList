import React, { } from 'react';
// import _ from 'lodash';

function Genres({ genres }) {

    // console.log(props);
    return (

        <ul className="list-group">
            <li className="list-group-item active">Cras justo odio</li>

            {genres.map(g => <li key={g._id} className="list-group-item" onClick={() => props.onGetGenre(g.name)}>{g.name}</li>

            )}
        </ul>
    );
}

export default Genres;