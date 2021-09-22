import React, { Component } from 'react';




// class Like extends Component {

//     render() {
//         let classes = this.props.liked ? "fa fa-heart" : "fa fa-heart-o";
//         return (<i onClick={this.props.onClick} style={{ cursor: 'pointer' }} className={classes} aria-hidden="true"></i>
//         );
//     }
// }

// export default Like;


const Like = (props) => {
    let classes = props.liked ? "fa fa-heart" : "fa fa-heart-o";
    return (<i
        onClick={props.onClick}
        style={{ cursor: 'pointer' }}
        className={classes} aria-hidden="true"></i>
    );
}

export default Like;