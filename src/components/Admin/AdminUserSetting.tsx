import React, {useState, useEffect} from "react";
import GroupSelect from "../Common/Select";
import Button from "../Common/Button";

type userInfo = {
    email: string,
    groupId: string, 
    groupName: string,
    admin: string,
}

const AdminUserSetting: React.FC = () => {

    const [userInfo, setUserInfo] = useState<userInfo>({
        email: "", groupId: "", groupName: "", admin: ""
    });
    const [userList, setUserList] = useState(['']);
    const [adminChecked, setAdminChecked] = useState(false);
    const [selectGroupList, setSelectGroupList] = useState<[{id: string, name: string}]>([{id:"", name:""}]);

    const [, setGroupId] = useState("");

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + '/admin/userlist', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then(res => res.json())
        .then(data => {
            setUserList(data);
        });

        fetch(import.meta.env.VITE_API_URL + '/admin/grouplist', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then(res => res.json())
        .then(data => {
            setSelectGroupList(data);
        });
    }, []);

    const getGroupbyEmail: React.MouseEventHandler<HTMLLIElement> = (event) => {
        const clickedEmail = event.currentTarget.textContent!;
        fetch(import.meta.env.VITE_API_URL + '/admin/userauth/'+clickedEmail, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then(res => res.json())
        .then(data => {
            setUserInfo(data);
            setAdminChecked(data.admin === "admin" ? true : false);
        });
    }

    const setGroupChangeHandler = (event:React.ChangeEvent<HTMLSelectElement>) => {
        setGroupId(event.target.value);
        setUserInfo((prev) => ({
            ...prev, 
            groupId: event.target.value
        }));
    }

    const setAdminCheckedHandler = () => {
        setAdminChecked(!adminChecked);
        setUserInfo((prev) => ({
            ...prev, 
            admin: !adminChecked ? "admin" : "user"
        }));
    }

    const saveGroup = () => {
        fetch(import.meta.env.VITE_API_URL + '/admin/set-userauth', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(userInfo),
        })
        .then(_ => alert("저장"));
    }

    return (
        <div className="grid grid-cols-2 divide-x ">
            <div className="shadow-md rounded-md">
                <ul className="divide-y divide-dashed">
                    {userList.map((email, index) => (
                        <li key={index} onClick={getGroupbyEmail}>{email}</li>
                    ))}
                </ul>
            </div>
            <div className="shadow-md rounded-md">
                <label htmlFor="Admin" className="flex cursor-pointer items-start gap-4">
                    <div>
                        <p className="font-medium text-gray-900"> 관리자 </p>
                    </div>
                    <div className="flex items-center">
                        &#8203;
                        <input type="checkbox" 
                            checked={adminChecked}
                            onChange={setAdminCheckedHandler} 
                            className="size-4 rounded border-gray-300" id="Admin" />
                    </div>
                </label>
                <GroupSelect group={userInfo.groupId} changeHandler={setGroupChangeHandler} name={"Group"} data={selectGroupList}/>
                <Button str={"저장"} class={"inline-block rounded-md bg-indigo-200 px-4 py-2 text-sm text-blue-500 shadow-sm focus:relative"} handler={saveGroup}/>
            </div>
        </div>
    );
}

export default AdminUserSetting;