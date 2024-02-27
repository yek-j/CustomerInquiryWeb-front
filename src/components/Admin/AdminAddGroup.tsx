import React, { useState, useEffect } from "react";
import { groupState } from "../state/groupState";
import { useRecoilState } from "recoil";
import AdminGroupForm from "./AdminGroupForm";

const AdminAddGroup: React.FC = () => {

    const [groupList, setGroupList] = useState<[{id: string, name: string}]>([{id:"", name:""}]);
    const [groupInfo, setGroupInfo] = useRecoilState(groupState);
    const [newForm, setNewForm] = useState(true);

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
        setNewForm(false);
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

    const addGroupForm = () => {
        setNewForm(true);
        setGroupInfo({id:"", name:"", description:"", userCount: 0});
    }

    const addOrUpdateGroup = () => {
        let addOrUpdate = newForm ? '/admin/add-group' : '/admin/group/'+groupInfo.id;
        let method = newForm ? 'POST' : 'PUT';
        
        fetch(import.meta.env.VITE_API_URL + addOrUpdate, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(groupInfo),
        })
        .then(res => {
            if(res.status === 200) {
                return res.json();
            } else {
                return res.text().then(errorMessage => {
                    throw new Error(errorMessage);
                });
            }
        })
        .then(data => {
            setGroupList(data);
        })
        .catch(error => {
            alert('Error: ' + error.message);
        });
    }

    const deleteGroup = () => {
        fetch(import.meta.env.VITE_API_URL + '/admin/group/'+groupInfo.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then(res => {
            if(res.status === 200) {
                return res.json();
            } else {
                return res.text().then(errorMessage => {
                    throw new Error(errorMessage || "그룹 삭제 실패");
                });
            }
        })
        .then(data => {
            setGroupList(data);
            setNewForm(true);
            setGroupInfo({id:"", name:"", description:"", userCount: 0});
        })
        .catch(error => {
            alert('Error: ' + error.message);
        });
    }

    return (
        <div className="grid grid-cols-2 divide-x ">
            <div className="shadow-md rounded-md">
                <ul className="divide-y divide-dashed">
                    <li className="cursor-pointer hover:bg-indigo-400 text-center" onClick={addGroupForm}>
                        새 그룹 추가
                    </li>
                    {groupList.map((group) => (
                        <li id={group.id} key={group.id} onClick={getGroupbyId}>{group.name}</li>
                    ))}
                </ul>
            </div>
            <div className="shadow-md rounded-md">     
                <AdminGroupForm newForm={newForm} saveHandler={addOrUpdateGroup} deleteHandler={deleteGroup}/>
            </div>
        </div>
    );
}

export default AdminAddGroup;