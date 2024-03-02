import { BoardPageType } from "../type/BoardItemType";

export const fetchList = async (page:number): Promise<BoardPageType> =>  {
    let api = '/boardlist';
    if(page > 0) api = api + '/' + page;

    const res = await fetch(import.meta.env.VITE_API_URL + api, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    });
    
    const data = await res.json();
    return data;
}