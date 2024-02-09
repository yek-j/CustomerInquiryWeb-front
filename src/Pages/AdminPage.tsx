import React, {useEffect} from "react";
import {useNavigate} from 'react-router-dom'

const AdminPage:React.FC = () => {
    const navigate = useNavigate();
  
    const chkAdmin = (admin: string) => {
        if (admin == "user") {
            alert("관리자만 접근할 수 있는 페이지입니다.")
            navigate("/");
        }
    };
    
    useEffect(() => {
        fetch('http://localhost:8080/chkadmin', {
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
    }, []);
    
    return (
        <h1>Admin Page</h1>
    );
};

export default AdminPage;