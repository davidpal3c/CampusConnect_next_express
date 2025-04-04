"use client"; 
import React, { useState, useRef, useEffect } from "react";
import { Editor } from '@tinymce/tinymce-react';
import { uploadImage } from "@/app/api/upload-image"; 
import { toast } from "react-toastify";
import DOMpurify from "dompurify";

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

      const purifiedValue = DOMpurify.sanitize(newValue)

      setEditorValue(purifiedValue);
      setContent(purifiedValue);
      // if (editorRef.current) {
      //   console.log(newValue);
      //   setContent(newValue);
      // }
    };

    // Handle image upload
    const handleImageUpload = async (blobInfo: any, progress: any) => {
      try {
        
        const file = new File([blobInfo.blob()], blobInfo.filename(), {
          type: blobInfo.blob().type
        });

        const result = await uploadImage(file);

        if (!result) {
          toast.error('Failed to upload image. creating article without image. Please contact support.');
          return; 
        }

        if (typeof result === 'object' && result.error) {
          toast.error(result.error || 'Failed to upload image. creating article without image. Please contact support.');
          return;  
        }

        return result;      
      } catch (error) {
        console.log('image upload', error)
        throw error;
      }
    }


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
            images_upload_handler: handleImageUpload,
            automatic_uploads: true,
            file_picker_types: 'image',
            images_reuse_filename: true,
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