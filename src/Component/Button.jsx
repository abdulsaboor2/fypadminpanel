import React from 'react';

function Button(props) {
    return (
        <button target={props.target} type={props.type} className={props.className} onClick={props.onClick}>{props.title}</button>
    );
}

export default Button;