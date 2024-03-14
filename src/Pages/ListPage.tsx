import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'

import Header from "../components/Common/Header";
import BoardList from "../components/Board/BoardList";
import BoardForm from "../components/Board/BoardForm";
import Button from "../components/Common/Button";
import { useRecoilState } from "recoil";
import { filterState } from "../components/state/listFilterState";

const ListPage:React.FC = () => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState("N");
    const [writeMode, setWriteMode] = useState(false);
    const [, setFilter] = useRecoilState(filterState);

    useEffect(() => {
        if(localStorage.getItem("token") == null) navigate("/signin");
        fetch(import.meta.env.VITE_API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then(res => res.json())
        .then(data => {
            if(data.admin == "user" && data.group == null) {
                navigate("/admincheck");
            } else if(data.admin == "admin") {
                setAdmin(data.admin);
            }
        });
    }, []);

    const changeWriteMode = () => {setWriteMode(true);}
    const changeViewMode = () => {setWriteMode(false);}

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        let resolved = formData.get('ResolvedState');
        let writer = formData.get('writer');
        setFilter({
            writer: writer == null ? '' : writer as string,
            resolved: resolved == null ? '' : resolved as string
        });
    }

    return (
        <div>
        <Header admin={admin}/>
            <div className="grid place-items-center">
                <div className="pt-6 justify-self-center">
                    <span className="inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-sm">
                        <Button
                            class={"inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"}
                            str={"글쓰기"}
                            handler={changeWriteMode}
                        />

                        <Button
                            class={"inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"}
                            str={"게시글"}
                            handler={changeViewMode}
                        />
                        
                    </span>
                </div>
                <div className="mt-2 w-full">
                    <form className="flex gap-1 justify-end px-10" onSubmit={submitHandler}>
                        <label htmlFor="WriterSearch" className="sr-only"> 작성자 검색 </label>

                        <input
                            type="text"
                            id="writer"
                            name="writer"
                            placeholder="작성자 검색"
                            className=" rounded-md border-gray-200 py-2.5 pe-10 shadow-sm text-sm"
                        />
                        <select
                            name="ResolvedState"
                            id="ResolvedState"
                            className="mt-1.5 rounded-lg border-gray-300 text-gray-700 text-sm"
                        >
                            <option value="">해결 상태 선택</option>
                            <option value="all">전체</option>
                            <option value="solved">해결</option>
                            <option value="unsolved">미해결</option>
                        </select>

                        <button
                            type="submit"
                            className="inline-block  rounded-lg bg-indigo-500 px-5 py-3 font-sm text-white"
                            >
                            적용
                        </button>
                    </form>
                </div>
                <div className="w-full">
                    {!writeMode && <BoardList />}
                    
                    {writeMode && <BoardForm id={""} change={() => {}} board={null}/>}
                </div>
            </div>
        </div>
    );
};

export default ListPage;