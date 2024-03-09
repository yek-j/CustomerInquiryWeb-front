import { BoardCommentType } from "../../type/BoardCommentItemType";

export const fetchDeleteComment = async (id: number) => {
    let deletOk = false;
    await fetch(import.meta.env.VITE_API_URL + '/comment/'+id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(res => {
        if(res.status === 200) {
            alert("삭제 성공");
            deletOk = true;
        } else {
            return res.text().then(errorMessage => {
                throw new Error(errorMessage);
            });
        }
    })
    .catch(error => {
        alert('Error: ' + error.message);
    });

    return deletOk;
}

export const fetchUpdateComment = async (comment: {commentId:number, comment:string}) => {
    let saveOK = false;
    await fetch(import.meta.env.VITE_API_URL + '/comment/' + comment.commentId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: comment.comment
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

export const fetchSaveComment = async (comment: {boardId:string, comment:string}) => {
    let saveOK = false;
    await fetch(import.meta.env.VITE_API_URL + '/comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(comment)
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

export const fetchCommentList = async (id: string):Promise<BoardCommentType[]> => {
    const res = await fetch(import.meta.env.VITE_API_URL + "/comment/" + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    });

    const data = await res.json();
    return data;
}

