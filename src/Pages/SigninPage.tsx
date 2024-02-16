import React from "react"
import {useNavigate} from 'react-router-dom'
import { nameState } from "../components/state/nameState";

import SignForm from "../components/Common/SignForm";
import { useRecoilState } from "recoil";

const Signin:React.FC = () => {
    const [, setUserName]  = useRecoilState(nameState);
    const navigate = useNavigate();


    const signinHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        fetch(import.meta.env.VITE_API_URL + '/signin', {
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
            localStorage.setItem("token", data.token);
            setUserName(data.name);
            navigate("/");
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