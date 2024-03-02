import React, {ChangeEvent, FormEvent, useState} from "react";

const BoardForm: React.FC = () => {

    const [formData, setFormData] = useState({title: '', content: ''});

    const saveBoard = (e: FormEvent) => {
        e.preventDefault();

        fetch(import.meta.env.VITE_API_URL + '/add-board', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }, 
            body: JSON.stringify(formData)
        })
        .then(res => {
            if(res.status === 200) {
                alert("저장 성공");
                setFormData({title: '', content: ''});
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

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className="w-screen mt-16">
            <div className="w-screen rounded-lg bg-white p-8 shadow-lg">
                <form onSubmit={saveBoard} className="space-y-4">
                <div>
                    <label className="sr-only" htmlFor="title">제목</label>
                            <input
                                className="w-full rounded-lg border-gray-200 p-3"
                                placeholder="제목"
                                type="text"
                                id="title"
                                name="title"
                                maxLength={50}
                                value={formData.title}
                                onChange={handleChange}
                            />
                </div>
                <div>
                    
                    <label className="sr-only" htmlFor="content">내용</label>
                          <textarea
                            className="w-full rounded-lg border-gray-200 p-3"
                            placeholder="내용"
                            rows={10}
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            ></textarea>
                </div>

                <div className="mt-4">
                    <button
                    type="submit"
                    className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                    >
                    저장
                    </button>
                </div>
                </form>
            </div>
        </div>
    );
}

export default BoardForm;