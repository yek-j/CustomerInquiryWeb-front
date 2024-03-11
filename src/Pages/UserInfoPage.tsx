import React, { useEffect, useState } from 'react';
import Header from '../components/Common/Header';
import UserInfoForm from '../components/User/UserInfoForm';
import { UserInfoType } from '../components/type/UserType';
import { useRecoilState } from 'recoil';
import { nameState } from '../components/state/nameState';

const UserInfoPage:React.FC = () => {
    const [, setUserName]  = useRecoilState(nameState);
    const [userInfo, setUserInfo] = useState<UserInfoType>({
        email: '', name: '', admin: 'user', password: ''
    });

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + '/userinfo', {
            method: 'GET',
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
                    throw new Error(errorMessage);
                });
            }
        })
        .then(data => {
            setUserInfo(data);
        })
        .catch(error => {
            alert('Error: ' + error.message);
        })
    }, []);

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        
        fetch(import.meta.env.VITE_API_URL + '/userinfo', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                email: formData.get('email'),
                name: formData.get('name'),
                password: formData.get('password'),
            }),
        })
        .then(res => {
            if(res.status === 200) {
                alert("사용자 정보 수정 완료")
                setUserName(formData.get('name'));
            } else {
                return res.text().then(errorMessage => {
                    throw new Error(errorMessage);
                });
            }
        })
        .catch(error => {
            alert('Error: ' + error.message);
        });
    }

    return( 
        <div>
            <Header admin={userInfo.admin} />
            <UserInfoForm data={userInfo} handler={submitHandler} />
        </div>
    )
}

export default UserInfoPage;