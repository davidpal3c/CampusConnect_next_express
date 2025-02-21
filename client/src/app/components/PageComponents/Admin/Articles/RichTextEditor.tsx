import React, { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function RichTextEditor() {
    // const [ content, setContent ] = useState("");
    const editorRef = useRef(null);
  
    const handleSubmit = () => {
      if (editorRef.current) {
        console.log(editorRef.current.getContent());
        // You can now send the content to your backend API
      }
    };
  
    return (
      <div>
        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue="<p>Start writing your article here...</p>"
          init={{
            height: 500,
            menubar: true,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar:
              'undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help',
            debugging: true,  
          }}
        />
        <button onClick={handleSubmit}>Submit Article</button>
      </div>
    );
  };

