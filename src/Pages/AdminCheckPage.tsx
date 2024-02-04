import React from "react";
import {useNavigate} from 'react-router-dom'

const AdminCheckPage:React.FC = () => {
    const navigate = useNavigate();

    const signOutHandler = () => {
        localStorage.clear();
        navigate("/signin");
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-40 py-40 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-lg font-bold leading-9 tracking-tight text-gray-900">
                        관리자의 인증 후 사용할 수 있는 계정입니다. 
                    </h2>
                    <h2 className="text-center text-lg font-bold leading-9 tracking-tight text-gray-900">
                        관리자에게 문의해주세요.
                    </h2>
                </div>

                <div className="grid place-items-center">
                    <button
                        onClick={signOutHandler}
                        className="w-1/3 h-10 justify-center rounded-md bg-indigo-600 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        로그아웃
                    </button>
                </div>
            </div>
        </>
    );
};

export default AdminCheckPage;