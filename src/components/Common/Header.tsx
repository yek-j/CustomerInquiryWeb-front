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

    const homeHandler = () => {
        navigate("/");
    }

    const signOutHandler = () => {
        localStorage.clear();
        navigate("/signin");
    }

    const infoPageHandler = () => {
        navigate("/info");
    }

    return (
        <header className="bg-white">
            <div className=" w-screen sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                <div className="flex-1 md:flex md:items-center md:gap-12">
                    <img className="py-1 cursor-pointer" src="/img/logo.jpg" onClick={homeHandler}/>
                </div>

                <div className="md:flex md:items-center md:gap-12">
                    <nav aria-label="Global" className="hidden md:block">
                        <ul className="flex items-center gap-6 text-sm">
                        {
                            props.admin == "admin" &&
                            <li><Link to="/admin"><p className="text-gray-500 transition hover:text-gray-500/75">관리자 페이지</p></Link></li>
                        }
                            <li>
                                <a className="text-gray-500 transition hover:text-gray-500/75 cursor-pointer" onClick={infoPageHandler}> 사용자 정보 </a>
                            </li>
                        </ul>
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className="sm:flex sm:gap-4">
                            <p
                            className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                            >
                            {userName} 님
                            </p>
                            <div className="hidden sm:flex">
                                <a
                                    className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 cursor-pointer"
                                    onClick={signOutHandler}
                                >
                                    로그아웃
                                </a>
                            </div>
                        </div>

                    <div className="block md:hidden">
                        <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </header>
    );
}

export default Header;