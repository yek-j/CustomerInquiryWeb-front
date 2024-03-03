import React, {useEffect, useState} from "react";
import BoardItem from "./BoardItem";
import { BoardItemType } from "../type/BoardItemType";
import { fetchList } from "./BoardListFetch";
import { Link } from "react-router-dom";



const BoardList: React.FC = () => {

    const [boardList, setBoardList] = useState<[BoardItemType]>([{
        id:0, writerName:'', groupName:'', title:'', preview:'', wdate:'', resolved:false
    }]);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(1);

    useEffect(() => {

        fetchList(0)
            .then((data) => {
                setBoardList(data.list);
                setTotalPage(data.total);
                setPage(0);
            });

    }, []);

    const nextPage = () => {
        if(page == totalPage-1) return;
        
        setPage(page + 1);
        fetchList(page + 1)
        .then(data => {
            setBoardList(data.list);
            setTotalPage(data.total);
        }); 
    }

    const prevPage = () => {
        if(page ==  0) return;
        setPage(page - 1);
        fetchList(page - 1)
        .then(data => {
            setBoardList(data.list);
            setTotalPage(data.total);
        }); 
    }

    return (
        <div className="grid ">
            <div className="divide-y divide-gray-100 mt-6 w-full">
                {
                    boardList.map((item) => (
                        <Link key={item.id} to={"/board/" + item.id}><BoardItem item={item} /></Link>
                    ))
                }
                
            </div>
            <div className="inline-flex items-center justify-center gap-3 mb-8">
                <a
                    onClick={prevPage}
                    className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                >
                    <span className="sr-only">Next Page</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                    />
                    </svg>
                </a>

                <p className="text-lg text-gray-900">
                    {page + 1}
                    <span className="mx-0.25">/</span>
                    {totalPage}
                </p>

                <a
                    onClick={nextPage}
                    className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                >
                    <span className="sr-only">Next Page</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                    />
                    </svg>
                </a>
            </div>
        </div>
    );
}

export default BoardList;