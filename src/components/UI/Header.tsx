import React from "react";
import { useRecoilState } from "recoil";
import { nameState } from "../state/nameState";
import { Link } from "react-router-dom";
const Header:React.FC = () => {
    const [userName, ] = useRecoilState(nameState);

    // Admin 확인 
    

    return (
        <header className="grid grid-cols-2 bg-slate-50 rounded-lg w-full h-14 my-3 drop-shadow-sm	">
            <img className="pl-6 py-1" src="/src/assets/logo.jpg"/>
            
            <details className="py-3 w-32 justify-self-end mr-5">
                <summary className="rounded-lg bg-indigo-100 marker:[font-size:0px] w-32 text-center text-lg cursor-pointer">{userName} 님!</summary>
                <ul className="text-center bg-white w-32 rounded-lg">
                    <li><Link className="" to="/admin">관리자 페이지</Link></li>
                    <hr/>
                    <li><a>사용자 정보 변경</a></li>
                    <hr/>
                    <li><a>로그아웃</a></li>
                </ul>
            </details>
        </header>
    );
}

export default Header;