import React, {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom'
import Header from "../components/Common/Header";
import AdminUserSetting from "../components/Admin/AdminUserSetting";
import AdminAddGroup from "../components/Admin/AdminAddGroup";


const AdminPage:React.FC = () => {
    const navigate = useNavigate();

    const [tab1, setTab1] = useState(true);
    const [tab2, setTab2] = useState(false);
    const defaultClass = "shrink-0 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700";
    const clickedClass = "shrink-0 border-b-2 border-sky-500 px-1 pb-4 text-sm font-medium text-sky-600";
    
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
    }, []);

    const changeTab = (tabId: string) => {
        if(tabId === "tab1") {
            setTab1(true);
            setTab2(false);
        }
        else if(tabId === "tab2") {
            setTab1(false)
            setTab2(true);
        }
    }
    
    
    return (
        <div> 
            <Header admin=""/>
            <div>
                <div className="sm:hidden">
                    <label htmlFor="Tab" className="sr-only">Tab</label>

                    <select id="Tab" className="w-full rounded-md border-gray-200">
                        <option value="tab1">그룹 및 관리자 설정</option>
                        <option value="tab2">그룹 추가</option>
                    </select>
                </div>

                <div className="hidden sm:block">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex gap-6" aria-label="Tabs">
                        <a
                                href="#"
                                onClick={() => changeTab("tab1")}
                                className={tab1 ? clickedClass : defaultClass}
                            >
                                그룹 및 관리자 설정
                            </a>

                            <a
                                href="#"
                                onClick={() => changeTab("tab2")}
                                className={tab2 ? clickedClass : defaultClass}
                            >
                                그룹 추가
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
            {tab1 && <AdminUserSetting/>}
            {tab2 && <AdminAddGroup/>}
        </div>
    );
};

export default AdminPage;