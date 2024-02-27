import React from "react";
import { groupState } from "../state/groupState";
import { useRecoilState } from "recoil";

import Button from "../Common/Button";

type groupForm = {
    newForm: boolean,
    saveHandler: () => void,
    deleteHandler: () => void,
}

const AdminGroupForm: React.FC<groupForm> = (props) => {

    const [group, setGroup] = useRecoilState(groupState);

    const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setGroup((prev) => ({
            ...prev,
            name: value
        }));
      };    
    
      const changeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setGroup((prev) => ({
            ...prev,
            description: value
        }));
      };

    return (
        <>
            <label htmlFor="GroupName" className="block text-xs font-medium text-gray-700"> 그룹 이름 </label>
                <input
                    type="text"
                    id="name"
                    placeholder="그룹이름"
                    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    value={group.name}
                    onChange={changeName}
                />
                <label htmlFor="GroupDescription" className="block text-sm font-medium text-gray-700"> 그룹 설명 </label>
                <textarea
                    id="description"
                    className="mt-2 w-full rounded-lg border-gray-200 align-top shadow-sm sm:text-sm"
                    rows={4}
                    placeholder="그룹 설명 입력"
                    onChange={changeDescription}
                    value={group.description || ''}
                />
                { !props.newForm && <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700">
                    인원 : {group.userCount} 명
                </span> } &nbsp;
                <Button str={props.newForm ? "추가" : "저장"} handler={props.saveHandler}/>
                { !props.newForm && <Button str={"삭제"} handler={props.deleteHandler}/> }
        </>
    );
}

export default AdminGroupForm;