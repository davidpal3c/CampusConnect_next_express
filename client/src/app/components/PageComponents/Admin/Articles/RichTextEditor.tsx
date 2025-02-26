"use client"; 
import React, { useState, useRef, useEffect } from "react";
import { Editor } from '@tinymce/tinymce-react';


type RichTextEditorProps = {
    article?: any,
    setContent?: any,
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ article, setContent }) => {
    // const [ content, setContent ] = useState("");
    const editorRef = useRef(null);
    const [tinyMceAPIKey] = useState(process.env.NEXT_PUBLIC_TINYMCE_API_KEY);
    const [editorValue, setEditorValue] = useState(article?.content || "");
  
    const handleContentChange = (newValue: string) => {
      setEditorValue(newValue);
      setContent(newValue);
      // if (editorRef.current) {
      //   console.log(newValue);
      //   setContent(newValue);
      // }
    };

    useEffect(() => {
        setEditorValue(article?.content || "");
    }, [article?.content]); 
  
    return (
      <div className="w-full">
        <Editor
          apiKey={tinyMceAPIKey}
          init={{
            height: 600,
            width: "100%",
            selectors: "textarea",
            toolbar:
              "undo redo | formatselect | bold italic fontsizeselect backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | emoticons | removeformat | image | link | fullscreen | \
              wordcount", 
            plugins: ['lists', 'emoticons', 'fullscreen', 'link', 'image', 'wordcount'],
            fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
            skin: "oxide", 
            content_css: "default", 
            debug: true, 
          }}
          value={editorValue}
          onEditorChange={(newValue) => handleContentChange(newValue)}
          ref={editorRef}
        />
        {/* <button onClick={handleSubmit}>Submit Article</button> */}
      </div>
    );
  };

  export default RichTextEditor;