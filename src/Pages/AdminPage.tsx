import React, {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom'
import Header from "../components/UI/Header";

type userInfo = {
    email: string,
    groupId: string, 
    groupName: string,
    admin: string,
}

const AdminPage:React.FC = () => {
    const navigate = useNavigate();

    const [userList, setUserList] = useState(['']);
    const [userInfo, setUserInfo] = useState<userInfo>({
        email: "", groupId: "", groupName: "", admin: ""
    });
    
    const chkAdmin = (admin: string) => {
        if (admin == "user") {
            alert("관리자만 접근할 수 있는 페이지입니다.")
            navigate("/");
        }
    };
    
    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + '/chkadmin', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then(res => res.json())
        .then(data => {
            chkAdmin(data.admin);
        });

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
    }, []);

    const getGroupbyEmail: React.MouseEventHandler<HTMLLIElement> = (event) => {
        const clickedEmail = event.currentTarget.textContent;
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
        });
    }
    
    return (
        <div> 
            <Header admin=""/>
            <div className="grid grid-cols-2 divide-x ">
                <div className="shadow-md rounded-md">
                    <ul>
                        {userList.map((email, index) => (
                            <li key={index} onClick={getGroupbyEmail}>{email}</li>
                        ))}
                    </ul>
                </div>
                <div className="shadow-md rounded-md">
                    <p>Group : {userInfo.groupName}</p>
                    <p>Admin : {userInfo.admin}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;