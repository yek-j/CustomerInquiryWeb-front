import { BoardPageType, SaveBoard } from "../type/BoardItemType";

export const fetchList = async (page:number, resolved:string, writer:string): Promise<BoardPageType> =>  {
    
    let api = '/boardlist?page='+page+'&resolved='+resolved+'&writer='+writer;

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

export const fetchDeleteBoard = async (id: string) =>  {
    let deleteOK = false;
    await fetch(import.meta.env.VITE_API_URL + "/board/" + id , {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    })
    .then(res => {
        if(res.status === 200) {
            alert("삭제 성공");
            deleteOK = true;
        } else {
            return res.text().then(errorMessage => {
                throw new Error(errorMessage);
            });
        }
    })
    .catch(error => {
        alert('Error: ' + error.message);
    });

    return deleteOK;
}

export const fetchSaveBoard = async (board: SaveBoard) => {
    let saveOK = false;
    await fetch(import.meta.env.VITE_API_URL + '/add-board', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }, 
        body: JSON.stringify(board)
    })
    .then(res => {
        if(res.status === 200) {
            alert("저장 성공");
            saveOK = true;
        } else {
            return res.text().then(errorMessage => {
                throw new Error(errorMessage);
            });
        }
    })
    .catch(error => {
        alert('Error: ' + error.message);
    });

    return saveOK;
}

export const fetchUpdateBoard = async (id: string, board: SaveBoard) => {
    let saveOK = false;
    await fetch(import.meta.env.VITE_API_URL + '/board/' + id ,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }, 
        body: JSON.stringify(board)
    })
    .then(res => {
        if(res.status === 200) {
            alert("수정 성공");
            saveOK = true;
        } else {
            return res.text().then(errorMessage => {
                throw new Error(errorMessage);
            });
        }
    })
    .catch(error => {
        alert('Error: ' + error.message);
    });

    return saveOK;
}

export const fetchUpdateResolved = async (id: string) => {
    let saveOK = false;
    await fetch(import.meta.env.VITE_API_URL + '/board/resolved/' + id ,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }, 
    })
    .then(res => {
        if(res.status === 200) {
            alert("해결 상태 수정 성공");
            saveOK = true;
        } else {
            return res.text().then(errorMessage => {
                throw new Error(errorMessage);
            });
        }
    })
    .catch(error => {
        alert('Error: ' + error.message);
    });

    return saveOK;
}