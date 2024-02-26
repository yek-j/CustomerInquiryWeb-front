import React from "react";

type btnState = {
    str: string, 
    handler: () => void,
}

const Button:React.FC<btnState> = (props) => {
    return (
        <button className="inline-block rounded-md bg-indigo-200 px-4 py-2 text-sm text-blue-500 shadow-sm focus:relative" onClick={props.handler}>{props.str}</button>
    );
}

export default Button;