import React from "react";
import {useNavigate} from 'react-router-dom'
import { useRecoilState } from "recoil";
import { nameState } from "../state/nameState";
import { Link } from "react-router-dom";

type stateAdmin = {
    admin: string
}

const Header:React.FC<stateAdmin> = (props) => {
    const navigate = useNavigate();
    const [userName, ] = useRecoilState(nameState);

    const signOutHandler = () => {
        localStorage.clear();
        navigate("/signin");
    }

    return (
        <header className="grid grid-cols-2 bg-slate-50 rounded-lg w-full h-14 my-3 drop-shadow-sm	">
            <img className="pl-6 py-1" src="/src/assets/logo.jpg"/>
            
            <details className="py-3 w-32 justify-self-end mr-5">
                <summary className="rounded-lg bg-indigo-100 marker:[font-size:0px] w-32 text-center text-lg cursor-pointer">{userName} 님!</summary>
                <ul className="text-center bg-white w-32 rounded-lg">
                    {
                        props.admin == "admin" &&
                        <li><Link to="/admin">관리자 페이지</Link></li>
                    }
                    <hr/>
                    <li><a>사용자 정보 변경</a></li>
                    <hr/>
                    <li><a onClick={signOutHandler}>로그아웃</a></li>
                </ul>
            </details>
        </header>
    );
}

export default Header;