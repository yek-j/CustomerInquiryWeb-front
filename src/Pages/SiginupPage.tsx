import React from "react"
import {useNavigate} from 'react-router-dom'

import SignForm from "../components/UI/SignForm";

const Signup:React.FC = () => {
    const navigate = useNavigate();

    const signupHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        
        fetch('http://localhost:8080/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name:formData.get("name"),
                email: formData.get('email'),
                password: formData.get('password'),
            }),
        })
        .then(res => res.json())
        .then(data => {
            if(data.result == "ok") {
                alert("회원가입 완료!")
                navigate('/signin');
            }
        })
        .catch((err) => {
            console.error(err.message);
        });
    }

    return (
        <>
            <SignForm type="signup" handler={signupHandler} />
        </>
    );
}

export default Signup;