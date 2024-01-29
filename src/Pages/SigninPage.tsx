import React from "react"

import SignForm from "../components/UI/SignForm";

const Signin:React.FC = () => {

    const signinHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        fetch('http://localhost:8080/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: formData.get('email'),
                password: formData.get('password'),
            }),
        })
        .then(res => res.json())
        .then(data => {
            // 로그인 성공 후..
            console.log(data);
        })
        .catch((err) => {
            console.error(err.message);
        });
    }

    return (
        <>
            <SignForm type="signin" handler={signinHandler}/> 
        </>
    );
}

export default Signin;