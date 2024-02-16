// BaordList, ListPage에 Header 아래에 들어갈것
import React from "react";
import BoardItem from "./BoardItem";

const dumyItem = [
    {title: "123", writer: "test", answer: false, date: "2024-02-11"},
    {title: "456", writer: "test2", answer: true, date: "2024-02-10"},
    {title: "789", writer: "test3", answer: true, date: "2024-02-9"},
]

const BoardList: React.FC = () => {

    return (
        <ul role="list" className="divide-y divide-gray-100">
            {dumyItem.map(() => (<BoardItem/>))}
        </ul>
    );
}

export default BoardList;