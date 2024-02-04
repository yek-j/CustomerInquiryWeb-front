import React from "react"
import {useNavigate} from 'react-router-dom'

import SignForm from "../components/UI/SignForm";

const Signin:React.FC = () => {
    const navigate = useNavigate();

    if(localStorage.getItem("token")) {
        navigate("/");
    }

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
        .then(res => {
            if(res.status == 401){
                alert("로그인 실패");
                throw new Error("로그인 실패");
            } 
            return res.json();
        })
        .then(data => {
            // 로그인 성공 후..
            localStorage.setItem("token",data.token);
            navigate('/');
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