import React, {ChangeEvent, FormEvent, useState, useEffect} from "react";
import { fetchSaveBoard, fetchUpdateBoard } from "./BoardFetch";
import { SaveBoard } from "../type/BoardItemType";

// react-quill
import QuillEditor from "./QuillEditor";

type BoardForm = {
    board: SaveBoard | null,
    id: string | undefined,
    change: () => void 
}

const BoardForm: React.FC<BoardForm> = (props) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (props.board != null) {
            setTitle(props.board.title);
            setContent(props.board.content);
        }        
    }, []);

    const saveBoard = (e: FormEvent) => {
        e.preventDefault();

        if(props.id === '') {
            fetchSaveBoard(title, content)
                .then((saveOK) => {
                    if(saveOK) {
                        setTitle('');
                        setContent('');
                    }
                });
        } else if(props.id != undefined) {
            fetchUpdateBoard(props.id, title, content) 
                .then((saveOK) => {
                    if(saveOK) props.change;
                });
        } else {
            alert("undefined 오류!");
        }
    }

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
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
                                value={title}
                                onChange={inputChangeHandler}
                            />
                </div>
                <div>
                    <label className="sr-only" htmlFor="content">내용</label>
                    
                    <QuillEditor content={content} setContent={setContent} />
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