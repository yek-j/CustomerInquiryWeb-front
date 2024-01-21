import React from "react"

import SignForm from "../UI/SignForm";

const Signin:React.FC = () => {

    const singinHandler = (event: React.FormEvent) => {
        event.preventDefault();
    }

    return (
        <>
            <SignForm type="signin" formHandler={singinHandler} />
        </>
    );
}

export default Signin;