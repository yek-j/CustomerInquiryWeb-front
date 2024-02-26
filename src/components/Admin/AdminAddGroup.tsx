import React, { useState, useEffect } from "react";
import Button from "../Common/Button";

type groupInfo = {
    id: string,
    name: string,
    description: string,
    userCount: number,
}

const AdminAddGroup: React.FC = () => {

    const [groupList, setGroupList] = useState<[{id: string, name: string}]>([{id:"", name:""}]);
    const [groupInfo, setGroupInfo] = useState<groupInfo>({id:"", name:"", description:"", userCount: 0});

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + '/admin/grouplist', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then(res => res.json())
        .then(data => {
            setGroupList(data);
        })
    }, []);

    const getGroupbyId: React.MouseEventHandler<HTMLLIElement> = (event) => {
        event.preventDefault();
        const clickedGroup = event.currentTarget.id;
        fetch(import.meta.env.VITE_API_URL + '/admin/group/'+clickedGroup, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then(res => res.json())
        .then(data => {
            setGroupInfo(data);
        });
    }

    const updateGroup = () => {

    }

    return (
        <div className="grid grid-cols-2 divide-x ">
            <div className="shadow-md rounded-md">
                <ul className="divide-y divide-dashed">
                    {groupList.map((group) => (
                        <li id={group.id} key={group.id} onClick={getGroupbyId}>{group.name}</li>
                    ))}
                </ul>
            </div>
            <div className="shadow-md rounded-md">     
                <label htmlFor="GroupName" className="block text-xs font-medium text-gray-700"> 그룹 이름 </label>
                <input
                    type="text"
                    id="name"
                    placeholder="그룹이름"
                    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    value={groupInfo.name}
                />
                <label htmlFor="GroupDescription" className="block text-sm font-medium text-gray-700"> 그룹 설명 </label>
                <textarea
                    id="description"
                    className="mt-2 w-full rounded-lg border-gray-200 align-top shadow-sm sm:text-sm"
                    rows={4}
                    placeholder="그룹 설명 입력"
                >{groupInfo.description}</textarea>
                <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700">
                    인원 : {groupInfo.userCount} 명
                </span> &nbsp;
                <Button str={"저장"} handler={updateGroup}/>
            </div>
        </div>
    );
}

export default AdminAddGroup;