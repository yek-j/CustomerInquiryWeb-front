import React from "react"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';

type QuillType = {
  content: string,
  setContent: React.Dispatch<React.SetStateAction<string>>
}

const QuillEditor:React.FC<QuillType> = (props) => {

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['image', 'code-block'],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  }

  return (
    <ReactQuill 
        className="w-full rounded-lg border-gray-200 p-3"
        placeholder="내용"
        theme="snow"
        id="content"
        modules={modules}
        value={props.content}
        onChange={props.setContent}
    />
  )
}

export default QuillEditor;