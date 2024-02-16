import React from "react";

type btnState = {
    str: string, 
    handler: () => void,
}

const Button:React.FC<btnState> = (props) => {
    return (
        <button onClick={props.handler}>{props.str}</button>
    );
}

export default Button;