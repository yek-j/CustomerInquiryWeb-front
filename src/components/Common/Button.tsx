import React from "react";

type btnState = {
    str: string, 
    class: string,
    handler: () => void,
}

const Button:React.FC<btnState> = (props) => {
    return (
        <button className={props.class} onClick={props.handler}>{props.str}</button>
    );
}

export default Button;